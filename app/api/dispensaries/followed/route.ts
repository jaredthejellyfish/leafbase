import { getServerSession } from 'next-auth/next';
import { Dispensary } from '@prisma/client';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const followed = await prisma.dispensarySubscription.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        dispensary: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    });

    const followedDispensaries = followed.map(
      (follow) => follow.dispensary as Dispensary
    );

    return NextResponse.json({ dispensaries: followedDispensaries });
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

export const dynamic = 'force-dynamic';
