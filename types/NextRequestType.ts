import { NextApiRequest } from "next";
export interface NextRequestType extends NextApiRequest {
  userId: string;
}
