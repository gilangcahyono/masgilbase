import jwt, { type JwtPayload } from "jsonwebtoken";
import crypto from "crypto";

const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;

export const createToken = (payload: any) => {
  return jwt.sign(payload, jwtSecretKey, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecretKey) as JwtPayload | null;
};

export const hashApiKey = (apiKey: string) => {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
};
