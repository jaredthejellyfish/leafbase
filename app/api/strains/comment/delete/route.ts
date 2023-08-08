import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { commentId: string };
    const { commentId } = body;
    if (!commentId) return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json({ comment: comment });
    } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
