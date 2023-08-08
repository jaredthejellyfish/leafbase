import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { Mixer } from '@prisma/client';

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
  const data = (await res.json()) as Mixer[];

  return data;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      strainId: string;
      strainName: string;
    };
    const { strainId, strainName } = body;
    if (!strainId || !strainName)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const mixers = await prisma.mixer.findMany({
      where: {
        strainId: strainId,
      },
    });

    if (mixers.length < 1) {
      const mixers = await fetchRecommendedStrainsData(strainName);

      const mixersWithStrainId = mixers.map((mixer: Mixer) => {
        return {
          ...mixer,
          strainId: strainId,
        };
      });

      await prisma.mixer.createMany({
        data: mixersWithStrainId,
      });

      return NextResponse.json({
        mixers: mixersWithStrainId,
      });
    }

    return NextResponse.json({
      mixers: mixers,
    });
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
