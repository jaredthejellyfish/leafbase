import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { strainId } = body;
    if (!strainId) throw new Error("Invalid request.");

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error("Unauthorized.");

    const like = await prisma.like.create({
      data: {
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

    return NextResponse.json({ like });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}