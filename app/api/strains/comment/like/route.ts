import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { commentId: string };
    const { commentId } = body;

    if (!commentId) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

    const existingLike = await prisma.commentLike.findFirst({
      where: {
        commentId: commentId,
        userId: user.id,
      },
    });

    if (existingLike) return NextResponse.json({ like: existingLike });

    const like = await prisma.commentLike.create({
      data: {
        comment: {
          connect: {
            id: commentId,
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
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
