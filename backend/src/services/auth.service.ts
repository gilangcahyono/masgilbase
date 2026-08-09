import bcrypt from "bcrypt";
import * as z from "zod";
import { prisma } from "../../lib/prisma.ts";
import { createToken } from "../../lib/auth.ts";
import { randomBytes } from "crypto";
import { loginSchema, registerSchema } from "../../lib/validation.ts";

type Login = z.infer<typeof loginSchema>;
type Register = z.infer<typeof registerSchema>;

export const login = async (payload: Login) => {
  const validation = loginSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
      statusCode: 422,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
      statusCode: 401,
    };
  }
  const passwordMatch = await bcrypt.compare(payload.password, user.password);

  if (!passwordMatch) {
    return {
      success: false,
      message: "Invalid email or password.",
      statusCode: 401,
    };
  }

  const token = createToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return {
    success: true,
    message: "Login successful.",
    accessToken: token,
    statusCode: 200,
  };
};

export const register = async (payload: Register) => {
  const validation = registerSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
      statusCode: 422,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists.",
      statusCode: 409,
    };
  }

  const apiKey: string = randomBytes(64).toString("base64");

  const newUser = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: await bcrypt.hash(payload.password, 12),
      apiKey,
    },
  });

  const data = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt,
  };

  return {
    success: true,
    data,
    message: "User created successfully.",
    statusCode: 201,
  };
};
