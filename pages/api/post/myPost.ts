import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";
// import User from "../../../model/User";
// import  Post from "../../../model/Post";

import { Model } from "mongoose";
import type { PostType } from "../../../model/Post";
import withProtect from "../../../middleware/withAuth";
const Post: Model<PostType> = require("../../../model/Post");
import type { Usertype } from "../../../model/User";
const User: Model<Usertype> = require("../../../model/User");
import type { NextRequestType } from "../../../types/NextRequestType";
async function handler(req: NextRequestType, res: NextApiResponse) {
  if (req.method === "GET") {
    await connectDb();

    const newUser = (await User.findOne({ _id: req.userId }))!;
    try {
      const users = await newUser.populate("posts");
      return res.status(200).json({ status: true, posts: users.posts });
    } catch (err) {
      return res.status(200).json({ status: false, posts: [] });
    }
  }
}

export default withProtect(handler);
// export default handler;
