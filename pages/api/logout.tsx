import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    res.setHeader(
      "Set-Cookie",
      cookie.stringifySetCookie({
        name: "token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      }),
    );

    res.json({
      ok: true,
    });
  }
}
