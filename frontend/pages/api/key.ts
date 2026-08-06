import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface User {
  id: string;
  name: string;
  email: string;
}

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

  const user = verifyToken(token) as User;

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const result = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { apiKey: true },
  });

  res.status(200).json({
    key: result.apiKey,
  });
}
