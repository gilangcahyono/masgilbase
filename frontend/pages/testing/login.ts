import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";
import * as cookie from "cookie";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email().nonempty({
    message: "Name is required.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .nonempty({
      message: "Password is required.",
    }),
});

export type LoginPayload = z.infer<typeof loginSchema>;

export interface LoginResponse {
  success: boolean;
  message: string | Record<string, string[]>;
  token?: string | undefined;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) => {
  if (req.method === "POST") {
    const payload = req.body as LoginPayload;

    const result = await loginSchema.safeParseAsync(payload);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.flatten().fieldErrors,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (passwordMatch) {
        const token = createToken({
          id: user.id,
          email: user.email,
          name: user.name,
        });

        res.setHeader(
          "Set-Cookie",
          cookie.stringifySetCookie({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
          }),
        );

        return res.status(200).json({
          success: true,
          message: "Login successful.",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    res.status(400).json({
      success: false,
      message: "Email not found.",
    });
  }
};

export default handler;
