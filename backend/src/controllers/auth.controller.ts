import { type Request, type Response } from "express";
import * as service from "../services/auth.service.ts";

export const login = async (req: Request, res: Response) => {
  const result = await service.login(req.body);

  res.cookie("access_token", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  res.status(200).json(result);
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    message: "Register berhasil",
    user: {
      name,
      email,
    },
  });
};
