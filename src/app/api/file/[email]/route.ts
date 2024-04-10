import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { email: string } }
) {
  // const email = req.nextUrl.searchParams.get("email");
  const email = context.params.email;
  if (!email)
    return NextResponse.json(
      { error: "email parameter missing" },
      { status: 422 }
    );

  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!session || !user || !session.user || session.user.email !== email)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const response = new NextResponse(user.bytes);
  response.headers.set(
    "content-type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  response.headers.set(
    "content-disposition",
    `attachment; filename="${user.filename}"`
  );

  return response;
}
