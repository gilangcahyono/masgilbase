import { type NextFunction, type Request, type Response } from "express";
import * as service from "../project/project.service.ts";
import { verifyToken } from "../../../lib/auth.ts";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.index();

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
    const user = verifyToken(req.cookies.access_token as string)!;
    const body = {
      ...req.body,
      accountId: user.id,
    };
    const result = await service.store(body);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      errors: result.errors,
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const projectId = req.params.id as string;

  try {
    const result = await service.show(projectId);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

// export const update = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const result = await service.login(req.body);

//     res.cookie("access_token", result.accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 1000 * 60 * 60 * 24,
//     });

//     res.status(result.statusCode).json({
//       success: result.success,
//       message: result.message,
//       errors: result.errors,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const destroy = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const result = await service.login(req.body);

//     res.cookie("access_token", result.accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 1000 * 60 * 60 * 24,
//     });

//     res.status(result.statusCode).json({
//       success: result.success,
//       message: result.message,
//       errors: result.errors,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const projectId = req.params.id as string;

  try {
    const result = await service.destroy(projectId);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
