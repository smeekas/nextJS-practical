import { NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";
// import User from "../../../model/User";
// import  Post from "../../../model/Post";

import { Model } from "mongoose";
import type { PostType } from "../../../model/Post";
const Post: Model<PostType> = require("../../../model/Post");
import type { NextRequestType } from "../../../types/NextRequestType";
async function handler(req: NextRequestType, res: NextApiResponse) {
  if (req.method === "GET") {
    await connectDb();
    const id = req.body.id || "62d91fb6d4b45ae3d475dcf5";
    const post = await Post.findById(id);
    return res.status(200).json({ data: post });
  }
}

export default handler;
