import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const file = req.body.file;

  if (req.method === "POST") {
    res.status(204).json({
      id: 1,
      url: "https://masgil.site/masgilbase/storage/files/image1.jpg",
      uploadedAt: new Date().toISOString(),
    });
  }
};

export default handler;
