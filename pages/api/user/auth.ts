import { NextApiResponse } from "next";

import { Usertype } from "../../../model/User";
import { Model } from "mongoose";

import withProtect from "../../../middleware/withAuth";
import { NextRequestType } from "../../../types/NextRequestType";
const User: Model<Usertype> = require("../../../model/User");
async function handler(req: NextRequestType, res: NextApiResponse) {
  const userData = await User.findOne({ _id: req.userId });
  if (!userData) {
    return res.status(400).json({
      status: false,
      message: "No user found",
    });
  }
  res.status(200).json({
    status: true,
    userName: userData?.userName,
    userId: userData?._id,
  });
}

export default withProtect(handler);
