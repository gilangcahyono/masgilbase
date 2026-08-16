import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import crypto from "crypto";

const mUpload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/i)) {
      return cb(new Error("File type not allowed"));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: "temp/",
    filename: (req, file, cb) => {
      const uniqName = crypto.randomBytes(16).toString("hex");
      const ext = file.originalname.split(".").pop()!;
      const fileName = `${uniqName}.${ext}`;

      return cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
}).single("file");

export const upload = (req: Request, res: Response, next: NextFunction) => {
  mUpload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size is too large",
        });
      }
    }

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    next();
  });
};
