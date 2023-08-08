import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

const fetchRecommendedStrainsData = async (strainName: string) => {
  const res = await fetch(`${process.env.LEAFBASE_API_URL}/find-matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: strainName,
    }),
  });
  const data = await res.json();

  return data;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name: string };
    const { name } = body;
    if (!name)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const recommendedStrainsData = await fetchRecommendedStrainsData(name);

    return NextResponse.json({ recommendedStrainsData });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
