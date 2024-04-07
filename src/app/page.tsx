import Home from "@/components/home";
import prisma from "./prisma";
import { User } from "@prisma/client";
import SessionProvider from "@/components/session";

export default async function Page() {
  // const users = await prisma.user.findMany();
  const users: User[] = [];
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
