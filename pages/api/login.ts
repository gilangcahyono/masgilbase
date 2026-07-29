import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

type LoginResponse = {
  success?: boolean;
  message?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (req.method === "POST") {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (email === user?.email) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET_KEY as string,
          {
            expiresIn: "1d",
          },
        );

        return res.status(200).json({
          success: true,
          token,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password salah.",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Email tidak terdaftar.",
      });
    }
  }
}
