import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      content: string;
      strainId: string;
    };
    const { content, strainId } = body;
    if (!content || !strainId) throw new Error('Invalid request.');
    if (content.length > 500) throw new Error('Comment too long.');

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) throw new Error('Unauthorized.');

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) throw new Error('Unauthorized.');

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
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
