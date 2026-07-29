import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";

type RegisterResponse = {
  ok: boolean;
  data?: {
    name: string;
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
      name: string;
      email: string;
      password: string;
    };

    const apiKey: string = randomBytes(32).toString("base64");

    if (!payload.name || !payload.email || !payload.password) {
      return res.status(400).json({
        ok: false,
        message: "Required field.",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: await bcrypt.hash(payload.password, 12),
        apiKey: apiKey,
      },
    });

    return res.status(200).json({
      ok: true,
      data: newUser,
      message: "User created successfully.",
    });
  }
}
