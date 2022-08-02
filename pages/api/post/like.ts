import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";

import { Model } from "mongoose";
import type { PostType } from "../../../model/Post";
import withProtect from "../../../middleware/withAuth";
const Post: Model<PostType> = require("../../../model/Post");
type ReqBodytype = {
  mode: boolean;
  postId: string;
  likedById: string;
};
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await connectDb();
    const { mode, postId, likedById } = req.body;

    const post: PostType = (await Post.findById(postId))!;

    if (!post) {
      return res
        .status(200)
        .json({ status: false, message: "No post exists with given Id" });
    }

    if (mode) {
      //!like the post

      if (post.likedBy.includes(likedById)) {
        return res.status(200).json({ message: "already liked" });
      }
      post.likes++;
      post.likedBy.push(likedById);
      const result = await post.save();
      return res.status(200).json({ data: result });
    } else {
      //!take back the like
      if (!post.likedBy.includes(likedById)) {
        return res
          .status(200)
          .json({ message: "if haven't liked the post yet" });
      }
      if (post.likes > 0) {
        post.likes--;
        post.likedBy = post.likedBy.filter((data) => {
          return data.toString() !== likedById;
        });
      }
      const result = await post.save();
      return res.status(200).json({ status: true, data: result });
    }
  }
}
export default withProtect(handler);
