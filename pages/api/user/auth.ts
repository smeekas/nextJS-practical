import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../utils/bcryptUtil";
import { connectDb } from "../../../utils/db";
import { Usertype } from "../../../model/User";
import { Model } from "mongoose";

import withProtect from "../../../middleware/withAuth";
import { NextRequestType } from "../../../types/NextRequestType";
const User: Model<Usertype> = require("../../../model/User");
type ReqBodyType = { email: string; password: string; userName: string };
async function handler(req: NextRequestType, res: NextApiResponse) {
  // console.log(req.userId);
  const userData = await User.findOne({ _id: req.userId });
  // console.log(userData);
  res.status(200).json({
    status: true,
    userName: userData?.userName,
    userId: userData?._id,
  });
}

export default withProtect(handler);
