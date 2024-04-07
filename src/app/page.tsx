import Home from "@/components/home";
import prisma from "./prisma";

export default async function Page() {
  const files = await prisma.file.findMany();

  return <Home files={files} />;
}
