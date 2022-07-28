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
  console.log(req.method);
  if (req.method === "POST") {
    // console.log(JSON.parse(req.body))
    const { email, password, userName }: ReqBodyType = req.body;
    console.log(email);
    await connectDb();
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res
        .status(400)
        .json({ message: "user already exists", created: false });
    }
    const userNameExists = await User.findOne({ userName: userName });
    if (userNameExists) {
      return res
        .status(400)
        .json({ message: "username already taken", created: false });
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
    console.log(result);
    return res.status(201).json({ message: "user created", created: true });
  }
}
