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

    if (!existingFollow)
      throw new Error('You are not following this dispensary.');

    await prisma.dispensarySubscription.delete({
      where: {
        id: existingFollow.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
