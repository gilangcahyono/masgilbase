import jwt from "jsonwebtoken";

const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;

export const createToken = (payload: any) => {
  return jwt.sign(payload, jwtSecretKey, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecretKey) as string;
  } catch {
    return null;
  }
};
