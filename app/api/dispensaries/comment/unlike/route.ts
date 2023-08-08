import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

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

    const like = await prisma.dispensaryCommentLike.findFirst({
      where: {
        commentId: commentId,
        userId: user.id,
      },
    });

    if (!like) throw new Error('Like not found.');

    await prisma.dispensaryCommentLike.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
