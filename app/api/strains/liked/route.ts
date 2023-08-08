import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { StrainExtended } from '@/types/interfaces';
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

    if (!session || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const likes = await prisma.like.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        strain: {
          select: {
            id: true,
            slug: true,
            nugImage: true,
            name: true,
          },
        },
      },
    });

    const likedStrains = likes.map((like) => like.strain as StrainExtended);

    // sort them by name
    const sortedLikedStrains = likedStrains.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });

    return NextResponse.json({ strains: sortedLikedStrains });
    } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
