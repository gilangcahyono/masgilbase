import * as z from "zod";
import { projectSchema } from "../../../lib/validation.ts";
import { prisma } from "../../../lib/prisma.ts";
import { randomBytes } from "node:crypto";
import { hashApiKey } from "../../../lib/auth.ts";

type Project = z.infer<typeof projectSchema>;

export const index = async () => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (projects.length === 0) {
    return {
      success: false,
      message: "Projects not found",
      statusCode: 404,
    };
  }

  return {
    success: true,
    message: "Projects fetched successfully",
    data: projects,
    statusCode: 200,
  };
};

export const store = async (payload: Project) => {
  console.log(payload);
  const validation = projectSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
      statusCode: 422,
    };
  }

  const apiKey = randomBytes(32).toString("hex");
  const apiSecret = hashApiKey(apiKey);

  const newProject = await prisma.project.create({
    data: {
      name: payload.name,
      desc: payload.desc,
      apiKey,
      apiSecret,
      accountId: payload.accountId,
    },
  });

  return {
    success: true,
    message: "Project created successfully",
    data: newProject,
    statusCode: 200,
  };
};

// export const update = async (payload: Project) => {
//   console.log(payload);
//   const validation = projectSchema.safeParse(payload);

//   if (!validation.success) {
//     return {
//       success: false,
//       message: "Validation failed.",
//       errors: validation.error.flatten().fieldErrors,
//       statusCode: 422,
//     };
//   }

//   const apiKey = randomBytes(32).toString("hex");
//   const apiSecret = hashApiKey(apiKey);

//   const newProject = await prisma.project.create({
//     data: {
//       name: payload.name,
//       desc: payload.desc,
//       apiKey,
//       apiSecret,
//       accountId: payload.accountId,
//     },
//   });

//   return {
//     success: true,
//     message: "Project created successfully",
//     data: newProject,
//     statusCode: 200,
//   };
// };

export const show = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      apiKey: true,
    },
  });

  if (!project) {
    return {
      success: false,
      message: "Project not found",
      statusCode: 404,
    };
  }

  return {
    success: true,
    message: "Project founded",
    data: project,
    statusCode: 200,
  };
};

export const destroy = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    return {
      success: false,
      message: "Project not found",
      statusCode: 404,
    };
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Project deleted successfully",
    statusCode: 200,
  };
};
