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
    if (!content || !strainId)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });
    if (content.length > 500)
      return NextResponse.json(
        { error: 'Comment must be less than 500 characters' },
        { status: 500 }
      );

    const session = await getServerSession(authOptions);

    if (!session?.user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
