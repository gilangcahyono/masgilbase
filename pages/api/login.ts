import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";
import * as cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email dan password wajib diisi.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const secretToken = createToken({
          id: user.id,
          email: user.email,
          name: user.name,
        });

        const publicToken = createToken({
          email: user.email,
          name: user.name,
        });

        res.setHeader(
          "Set-Cookie",
          cookie.stringifySetCookie({
            name: "token",
            value: secretToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
          }),
        );

        return res.status(200).json({
          ok: true,
          token: publicToken,
        });
      }

      return res.status(401).json({
        ok: false,
        message: "Incorrect password.",
      });
    }

    res.status(400).json({
      ok: false,
      message: "Email not found.",
    });
  }
}
