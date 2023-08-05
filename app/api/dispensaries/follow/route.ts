import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { dispensaryId: string };
    const { dispensaryId } = body;
    if (!dispensaryId) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

    const existingFollow = await prisma.dispensarySubscription.findFirst({
      where: {
        dispensaryId: dispensaryId,
        userId: user.id,
      },
    });

    if (existingFollow) return NextResponse.json({ like: existingFollow });

    const follow = await prisma.dispensarySubscription.create({
      data: {
        dispensary: {
          connect: {
            id: dispensaryId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({ follow });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
