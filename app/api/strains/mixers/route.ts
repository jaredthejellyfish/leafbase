import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';
import { Mixer } from '@prisma/client';

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
    const body = await request.json();
    const { strainId, strainName } = body;
    if (!strainId || !strainName) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);

    if (!session) throw new Error('Unauthorized.');

    const mixers = await prisma.mixer.findMany({
      where: {
        strainId: strainId,
      },
    });

    if (mixers.length < 1) {
      console.log('MIXERS NOT FOUND');
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
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
