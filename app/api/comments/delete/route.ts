import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { commentId } = body;
    if (!commentId) throw new Error("Invalid request.");

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) throw new Error("Unauthorized.");

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) throw new Error("Unauthorized.");

    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
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
