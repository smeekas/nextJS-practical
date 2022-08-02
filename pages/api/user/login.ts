import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, comparePassword } from "../../../utils/bcryptUtil";
import { connectDb } from "../../../utils/db";
import { Usertype } from "../../../model/User";
import { Model } from "mongoose";
import jwt from "jsonwebtoken";
const User: Model<Usertype> = require("../../../model/User");
type ReqBodyType = { email: string; password: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();
    const { email, password }: ReqBodyType = req.body;
    //!EMAIL validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User doesn't exists with given Email" });
    }
    const isEqual = await comparePassword(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ status: false, message: "Wrong Password" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "shinzouwosasageyo",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      status: true,
      token: token,
      userId: user._id.toString(),
      userName: user.userName,
    });
  }
}
