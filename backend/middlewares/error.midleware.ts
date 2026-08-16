import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.error(error.message);

  const errorMessage =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : error.message;

  return res.status(500).json({
    success: false,
    message: errorMessage,
  });
};
