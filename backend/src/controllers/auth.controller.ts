import { type NextFunction, type Request, type Response } from "express";
import * as service from "../services/auth.service.ts";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.login(req.body);

    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      errors: result.errors,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.register(req.body);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data,
      errors: result.errors,
    });
  } catch (error) {
    next(error);
  }
};
