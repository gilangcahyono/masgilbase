// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  id: string;
  url: string;
  uploadedAt: string;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  res.status(200).json([
    {
      id: "1",
      url: "https://example.com/image.jpg",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "2",
      url: "https://example.com/image2.jpg",
      uploadedAt: new Date().toISOString(),
    },
  ]);
}
