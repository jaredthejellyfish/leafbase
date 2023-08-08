import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

const fetchLikedStrainsData = async (strainNames: string[]) => {
  const res = await fetch(`${process.env.LEAFBASE_API_URL}/liked-plot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      strains: strainNames,
    }),
  });
  const data = await res.json();

  return data;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { strains: string[] };
    const { strains } = body;
    if (!strains) return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const likedStrainsData = await fetchLikedStrainsData(strains);

    return NextResponse.json({ likedStrainsData });
    } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
