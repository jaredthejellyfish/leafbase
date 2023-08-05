import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';
import { Dispensary } from '@prisma/client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

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
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
