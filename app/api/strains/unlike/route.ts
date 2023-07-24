import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { strainId: string };
    const { strainId } = body;
    if (!strainId) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

    const like = await prisma.like.findFirst({
      where: {
        strainId: strainId,
        userId: user.id,
      },
    });

    if (!like) throw new Error('Like not found.');

    await prisma.like.delete({
      where: {
        id: like.id,
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
