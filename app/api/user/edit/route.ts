import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

interface UserUpdate {
  name: string;
  email: string;
  aboutMe: string;
  birthDate: string;
  languages: string;
  phone: string;
  location: string;
  displayName: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UserUpdate;

    const { name, email, birthDate, languages, phone, location, displayName } =
      body;

    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      throw new Error('User is not logged in or session expired.');

    prisma.user
      .update({
        where: {
          email: session.user.email,
        },
        data: {
          name: name,
          email: email,
          aboutMe: body.aboutMe,
          birthDate: !isNaN(Date.parse(birthDate))
            ? new Date(Date.parse(birthDate))
            : undefined,
          languages: languages,
          phone: phone,
          location: location,
          displayName: displayName,
        },
      })
      .then(() => {
        return NextResponse.json({ ok: true });
      });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
