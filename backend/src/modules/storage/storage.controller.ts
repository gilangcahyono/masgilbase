import { type NextFunction, type Request, type Response } from "express";
import * as service from "./storage.service.ts";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.get(req.params.id as string);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.file as Express.Multer.File;

    const result = await service.upload(file);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data,
      file: result.file,
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.get(req.params.id as string);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.remove(req.params.id as string);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
