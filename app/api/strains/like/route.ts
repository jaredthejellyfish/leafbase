import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { strainId: string };
    const { strainId } = body;
    if (!strainId) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

    const existingLike = await prisma.like.findFirst({
      where: {
        strainId: strainId,
        userId: user.id,
      },
    });

    if (existingLike) return NextResponse.json({ like: existingLike });

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

    if (!like) throw new Error('Error creating like.');

    return NextResponse.json({ like });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
