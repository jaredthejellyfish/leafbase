import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { strainId: string };
    const { strainId } = body;
    if (!strainId) return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const like = await prisma.like.findFirst({
      where: {
        strainId: strainId,
        userId: user.id,
      },
    });

    if (!like) return NextResponse.json({ error: 'Like not found' }, { status: 500 });

    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json({ success: true });
    } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
