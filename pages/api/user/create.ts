import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../utils/bcryptUtil";
import { connectDb } from "../../../utils/db";
import { Usertype } from "../../../model/User";
import { Model } from "mongoose";
const User: Model<Usertype> = require("../../../model/User");
type ReqBodyType = { email: string; password: string; userName: string };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, userName }: ReqBodyType = req.body;
    await connectDb();
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({
        message: "user already exists with given Email",
        created: false,
      });
    }
    const userNameExists = await User.findOne({ userName: userName });
    if (userNameExists) {
      return res
        .status(400)
        .json({ message: "username is already taken", created: false });
    }
    const hashedPassword = await hashPassword(password);
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "invalid password", created: false });
    }

    //check unique userName
    const user = new User({
      email: email,
      password: hashedPassword,
      userName: userName,
    });
    const result = await user.save();
    return res.status(201).json({ message: "user created", created: true });
  }
}
