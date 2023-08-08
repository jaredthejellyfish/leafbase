import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      throw new Error('User is not logged in or session expired.');

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!user) throw new Error('User not found.');

    return NextResponse.json({ user: user });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
