import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/interface/jwt";
import { verifyToken } from "@/lib/auth";
import formidable from "formidable";
import path from "path";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface File {
  originalFilename: string;
  newFilename: string;
  ext: string;
  size: number;
  mimetype: string;
  filepath: string;
  mtime: string;
  url: string;
  userId: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const token = req.cookies.token;

  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorized",
  //   });
  // }

  // const user = verifyToken(token) as User;

  // if (!user) {
  //   return res.status(401).json({
  //     message: "Unauthorized",
  //   });
  // }

  if (req.method === "GET") {
    res.status(200).json([
      {
        id: 1,
        url: "https://masgil.site/masgilbase/storage/files/image1.jpg",
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 2,
        url: "https://masgil.site/masgilbase/storage/files/image2.png",
        uploadedAt: new Date().toISOString(),
      },
    ]);
  }

  if (req.method === "POST") {
    const form = formidable();
    const [fields, files] = await form.parse(req);

    if (!files.file) {
      return res.status(400).json({ message: "Required file" });
    }

    const file: File = JSON.parse(JSON.stringify(files.file[0]));
    file.ext = path.extname(file.originalFilename);

    const data: File = {
      originalFilename: file.originalFilename,
      newFilename: file.newFilename,
      ext: file.ext,
      size: file.size,
      mimetype: file.mimetype,
      filepath: file.filepath,
      mtime: file.mtime,
      url: `https://masgil.site/masgilbase/public/storage/files/${file.newFilename}.${file.ext}`,
      userId: "e60c23f9-8206-4de2-9b79-5867799ef925",
    };

    const newFile = await prisma.file.create({ data });
    const uploadDir = path.join(process.cwd(), "public/storage/files");

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const destination = path.join(uploadDir, `${file.newFilename}${file.ext}`);

    await fs.copyFile(file.filepath, destination);

    res.status(201).json({
      success: true,
      data: newFile,
      message: "File uploaded successfully",
    });
  }
};

export default handler;
