import { NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";

import { Model } from "mongoose";
import type { PostType } from "../../../model/Post";
const Post: Model<PostType> = require("../../../model/Post");
import type { Usertype } from "../../../model/User";
const User: Model<Usertype> = require("../../../model/User");
import type { NextRequestType } from "../../../types/NextRequestType";
async function handler(req: NextRequestType, res: NextApiResponse) {
  if (req.method === "GET") {
    await connectDb();
    const post = await Post.find().populate("createdBy", "userName");
    return res.status(200).json({ data: post });
  }
}

export default handler;
