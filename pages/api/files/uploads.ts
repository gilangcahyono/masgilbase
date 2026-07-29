// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  id: string;
  url: string;
  uploadedAt: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method === "POST") {
    res.status(200).json({
      id: "1",
      url: "https://example.com/image.jpg",
      uploadedAt: new Date().toISOString(),
    });
  }
}
