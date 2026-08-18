import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.ts";
import { hashApiKey, verifyToken } from "../lib/auth.ts";

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      error: "Token required",
    });
  }

  const validToken = verifyToken(token);

  if (!validToken) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  next();
};

export const checkApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const hashedApiKey = await hashApiKey(apiKey);

  const result = await prisma.project.findUnique({
    where: { apiSecret: hashedApiKey },
  });

  if (!result) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
};
