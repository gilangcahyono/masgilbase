import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const registerSchema = z
  .object({
    name: z.string().nonempty({
      message: "Name is required.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const projectSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required.",
  }),
  desc: z.string(),
  accountId: z.string().nonempty({
    message: "Account ID is required.",
  }),
});
