import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;
  const token: string | undefined = req.cookies.get("token")?.value;

  const loginUrl = new URL("/login", req.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, jwtSecretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}
export const config = {
  matcher: "/dashboard/:path*",
};
