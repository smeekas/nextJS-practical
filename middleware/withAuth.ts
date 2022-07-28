import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import type { decodedTokenType } from "../types/decodedTokenType";
import type { NextRequestType } from "../types/NextRequestType";
export default function withProtect(
  handler: (req: NextRequestType, res: NextApiResponse) => Promise<void>
) {
  async function protect(req: NextRequestType, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: false, message: "Not authenticated" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(
        token,
        "shinzouwosasageyo"
      ) as decodedTokenType;
      // console.log(decodedToken);
      if (!decodedToken) {
        return res
          .status(401)
          .json({ status: false, message: "Not authenticated" });
      }
      // console.log(decodedToken.userId);
      req.userId = decodedToken.userId;
      return handler(req, res);
    } catch (e) {
      res.status(401).json({ status: false, message: "Not authorized" });
    }
  }
  return protect;
}
//TODO 500 error checking usin try-catch in all routes
