import { User } from "@/interface/jwt";
import { verifyToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const user = verifyToken(token) as User;

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  res.status(200).json([
    {
      id: "1",
      url: "https://example.com/image.jpg",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "2",
      url: "https://example.com/image2.jpg",
      uploadedAt: new Date().toISOString(),
    },
  ]);
}
