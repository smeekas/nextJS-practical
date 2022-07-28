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
// const User = require("../../../model/User");
async function handler(req: NextRequestType, res: NextApiResponse) {
  if (req.method === "GET") {
    await connectDb();
    // const user=new User();
    // const post = await Post.findById("62d91fb6d4b45ae3d475dcf5").populate(
    //   "likedBy"
    // );
    // const post:any = (await Post.find()).map(async (item)=>{
    //   return await item.populate('createdBy')
    // })
    const post = await Post.find().populate("createdBy",'userName');
    // console.log(post[0].createdBy);
    return res.status(200).json({ data: post });
  }
}

// export default withProtect(handler);
export default handler;
