import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await prisma.$connect();
    console.log("Database connected ✅");
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Database connection failed ❌");
    console.error(error);
    res.status(500).json({
      success: false,
    });
  } finally {
    await prisma.$disconnect();
  }
}
