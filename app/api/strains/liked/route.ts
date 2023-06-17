import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error("Unauthorized.");

    const likes = await prisma.like.findMany({
      where: {
        userId: user.id,
      },
      include: {
        strain: true,
      },
    });
    const likedStrains = likes.map((like) => like.strain);

    return NextResponse.json({ strains: likedStrains });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
