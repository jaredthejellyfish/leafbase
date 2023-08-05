import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';
import { StrainExtended } from '@/types/interfaces';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

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
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
