"use server";

import prisma from "./prisma";

export const addFile = async (name: string) => {
  return await prisma.file.create({ data: { name } });
};
