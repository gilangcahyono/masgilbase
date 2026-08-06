import jwt from "jsonwebtoken";

const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;

export function createToken(payload: any) {
  return jwt.sign(payload, jwtSecretKey, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, jwtSecretKey);
  } catch {
    return null;
  }
}
