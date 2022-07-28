import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../utils/db";
// import User from "../../../model/User";
import { Usertype } from "../../../model/User";
import { Model } from "mongoose";
const User: Model<Usertype> = require("../../../model/User");
type ReqBodyType = {
  email: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    await connectDb();
    const email: string = req.body.email;
    const result = await User.deleteOne({ email: email });
    console.log(result);
    return res.status(200).json({ data: result });
  }
}
