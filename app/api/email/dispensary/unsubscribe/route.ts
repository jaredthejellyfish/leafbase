import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const dispensaryId = searchParams.get('dispensary');
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

    const slug = await prisma.dispensary.findUnique({
      where: {
        id: dispensaryId,
      },
      select: {
        slug: true,
      },
    });

    if (!slug) return NextResponse.redirect(`/dispensaries`);

    return NextResponse.redirect(
      new URL(`/dispensaries/${slug.slug}`, request.url)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
