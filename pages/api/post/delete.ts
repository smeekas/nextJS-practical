import { NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";

import { Model } from "mongoose";
import type { PostType } from "../../../model/Post";
const Post: Model<PostType> = require("../../../model/Post");
import type { Usertype } from "../../../model/User";
const User: Model<Usertype> = require("../../../model/User");
import type { NextRequestType } from "../../../types/NextRequestType";
import withProtect from "../../../middleware/withAuth";
async function handler(req: NextRequestType, res: NextApiResponse) {
  if (req.method === "POST") {
    await connectDb();
    const user = (await User.findOne({ _id: req.userId }))!;
    user.posts = user.posts.filter(
      (postId) => postId.toString() !== req.body.postId
    );
    await user.save();
    const post = await Post.deleteOne({ _id: req.body.postId });
    return res.status(200).json({ data: post });
  }
}

export default withProtect(handler);
