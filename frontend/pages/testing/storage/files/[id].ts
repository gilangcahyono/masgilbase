import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

interface User {
  id: string;
  name: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    // const token = req.cookies.token;

    // if (!token) {
    //   return res.status(401).json({
    //     message: "Una`uthorized",
    //   });
    // }

    // const user = verifyToken(token) as User;

    // if (!user) {
    //   return res.status(401).json({
    //     message: "Unauthorized",
    //   });
    // }

    const fileId = req.query.id as string;
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
      select: {
        id: true,
        newFilename: true,
        ext: true,
      },
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const filePath = path.join(
      process.cwd(),
      "public/storage/files",
      `${file.newFilename}${file.ext}`,
    );

    await fs.unlink(filePath);
    await prisma.file.delete({
      where: {
        id: file.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  }
}
