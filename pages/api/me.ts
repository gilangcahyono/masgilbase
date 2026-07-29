import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  res.json(user);
}
