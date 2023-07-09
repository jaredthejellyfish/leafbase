import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      throw new Error('User is not logged in or session expired.');

    prisma.user
      .update({
        where: {
          email: session.user.email,
        },
        data: {
          name: body.name,
          email: body.email,
          aboutMe: body.aboutMe,
          birthDate: !isNaN(Date.parse(body.birthDate))
            ? new Date(Date.parse(body.birthDate))
            : undefined,
          languages: body.languages,
          phone: body.phone,
          location: body.location,
          displayName: body.displayName,
        },
      })
      .then((user) => {
        return user;
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
