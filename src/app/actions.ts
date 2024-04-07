"use server";

import { SpreadsheetService } from "@/services/spreadsheet";
import prisma from "./prisma";
import { WorkBook, write } from "xlsx";

export const upsertUser = async (
  email: string,
  filename: string,
  spreadsheet: WorkBook
) => {
  const bytes = write(spreadsheet, { type: "buffer" }) as Buffer;
  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      filename,
      bytes,
    },
    update: {
      bytes,
      filename,
    },
  });
};

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    select: { filename: true, modified: true, uploaded: true },
    where: { email },
  });
  return user;
};

export const deleteUser = async (email: string) => {
  const user = await prisma.user.delete({ where: { email } });
  return user;
};
