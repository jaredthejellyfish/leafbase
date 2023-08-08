import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const dispensaryId = searchParams.get('dispensary');
    if (!dispensaryId)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.redirect(
        new URL(`/auth/error?error=MustBeLoggedIn`, request.url)
      );

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });
    if (!user)
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

    const slug = await prisma.dispensary.findUnique({
      where: {
        id: dispensaryId,
      },
      select: {
        slug: true,
      },
    });

    if (!slug)
      return NextResponse.redirect(new URL(`/dispensaries`, request.url));

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

export const dynamic = 'force-dynamic';
