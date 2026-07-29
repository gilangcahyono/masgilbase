import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";

type RegisterResponse = {
  success: boolean;
  data?: {
    email: string;
    password: string;
    apiKey: string;
  };
  message?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (req.method === "POST") {
    const payload = req.body as {
      email: string;
      password: string;
    };

    const apiKey: string = randomBytes(32).toString("base64");

    if (!payload.email || !payload.password) {
      return res.status(400).json({
        success: false,
        message: "Required email and password.",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email: payload.email,
        password: await bcrypt.hash(payload.password, 12),
        apiKey: apiKey,
      },
    });

    return res.status(200).json({
      success: true,
      data: newUser,
      message: "Pendaftaran berhasil.",
    });
  }
}
