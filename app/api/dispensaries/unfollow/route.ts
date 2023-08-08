import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { dispensaryId: string };
    const { dispensaryId } = body;
    if (!dispensaryId)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const existingFollow = await prisma.dispensarySubscription.findFirst({
      where: {
        dispensaryId: dispensaryId,
        userId: user.id,
      },
    });

    if (!existingFollow)
      return NextResponse.json(
        { error: 'You are not following this dispensary.' },
        { status: 500 }
      );

    await prisma.dispensarySubscription.delete({
      where: {
        id: existingFollow.id,
      },
    });

    return NextResponse.json({ success: true });
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
