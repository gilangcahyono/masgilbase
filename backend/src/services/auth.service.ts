import bcrypt from "bcrypt";
import * as z from "zod";
import { prisma } from "../../lib/prisma.ts";
import { createToken } from "../../lib/auth.ts";

const loginSchema = z.object({
  email: z.string().email().nonempty({
    message: "Name is required.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .nonempty({
      message: "Password is required.",
    }),
});

export type Login = z.infer<typeof loginSchema>;

export const login = async ({ email, password }: Login) => {
  const result = await loginSchema.safeParseAsync({ email, password });
  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
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
      };
    }

    return {
      success: false,
      message: "Incorrect password.",
    };
  }

  return {
    success: false,
    message: "Email not found.",
  };
};
