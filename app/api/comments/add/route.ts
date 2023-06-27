import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, strainId } = body;
    if (!content || !strainId) throw new Error("Invalid request.");

    //const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: "ger.almenara@gmail.com",
      },
    });

    if (!user) throw new Error("Unauthorized.");

    const comment = await prisma.comment.create({
      data: {
        body: content,
        strain: {
          connect: {
            id: strainId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({ comment: comment });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
