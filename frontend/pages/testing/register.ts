import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";
import * as z from "zod";

const registerSchema = z
  .object({
    name: z.string().nonempty({
      message: "Name is required.",
    }),
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
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .nonempty({
        message: "Password is required.",
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterPayload = z.infer<typeof registerSchema>;

interface RegisterResponse {
  success: boolean;
  data?: {
    name: string;
    email: string;
    password: string;
    apiKey: string;
  };
  message: string | Record<string, string[]>;
  token?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) => {
  if (req.method === "POST") {
    const payload = req.body as RegisterPayload;
    const apiKey: string = randomBytes(32).toString("base64");

    const result = await registerSchema.safeParseAsync(payload);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.flatten().fieldErrors,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: await bcrypt.hash(payload.password, 12),
        apiKey,
      },
    });

    return res.status(200).json({
      success: true,
      data: newUser,
      message: "User created successfully.",
    });
  }
};

export default handler;
