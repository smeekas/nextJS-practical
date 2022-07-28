import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";
// import Post from "../../../model/Post";
import { Model } from "mongoose";
import type { PostType } from "../../../model/Post";
import withProtect from "../../../middleware/withAuth";

import { NextRequestType } from "../../../types/NextRequestType";
import { Usertype } from "../../../model/User";
const Post: Model<PostType> = require("../../../model/Post");
const User: Model<Usertype> = require("../../../model/User");
async function handler(req: NextRequestType, res: NextApiResponse) {
  if (req.method === "POST") {
    const text: string = req.body.text;
    if (countWords(text) >= 50) {
      return res
        .status(400)
        .json({ message: "number of words should be less than 50." });
    }
    await connectDb();
    const newPost = new Post({
      text: text,
      createdBy: req.userId,
    });
    const currUser = (await User.findOne({ _id: req.userId }))!;

    await currUser.posts.push(newPost.id);
    await currUser.save();
    const result = await newPost.save();
    return res.status(200).json({ data: result });
  }
}
export default withProtect(handler);
export function countWords(text: string): number {
  text = " " + text;
  let count = 0;
  for (let i = 1; i < text.length; i++) {
    if (text[i] !== " " && text[i - 1] === " ") {
      count++;
    }
  }
  return count;
  //   const num = text.split(" ").length;
  //   //   console.log(num);
  //   return num;
}
