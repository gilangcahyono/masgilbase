import bcrypt from "bcrypt";
import * as z from "zod";
import { loginSchema, registerSchema } from "../../../lib/validation.ts";
import { prisma } from "../../../lib/prisma.ts";
import { createToken } from "../../../lib/auth.ts";

type Login = z.infer<typeof loginSchema>;
type Register = z.infer<typeof registerSchema>;

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

  const existingUser = await prisma.account.findUnique({
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

  const newUser = await prisma.account.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: await bcrypt.hash(payload.password, 12),
    },
  });

  const data = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
  };

  return {
    success: true,
    data,
    message: "User created successfully.",
    statusCode: 201,
  };
};

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

  const user = await prisma.account.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
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
    name: user.name,
    email: user.email,
  });

  return {
    success: true,
    message: "Login successful.",
    accessToken: token,
    statusCode: 200,
  };
};

export const logout = async (token: string) => {
  return {
    success: true,
    message: "Logout successful.",
    statusCode: 200,
  };
};

export const me = async (id: string) => {
  const user = await prisma.account.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
      statusCode: 404,
    };
  }

  return {
    success: true,
    message: "User found",
    data: user,
    statusCode: 200,
  };
};
