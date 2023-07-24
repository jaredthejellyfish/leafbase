import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lon, city } = body;

    const withCoords = {
      AND: [
        {
          latitude: {
            gte: lat - 0.1,
            lte: lat + 0.1,
          },
        },
        {
          longitude: {
            gte: lon - 0.1,
            lte: lon + 0.1,
          },
        },
      ],
    };

    const withoutCoords = {
      city: {
        equals: city && city.split(',')[0],
      },
    };

    const dispensaries = await prisma.dispensary.findMany({
      where: {
        ...(lat && lon ? withCoords : withoutCoords),
      },
      select: {
        id: true,
        slug: true,
        name: true,
        city: true,
        latitude: true,
        longitude: true,
      },
    });

    return NextResponse.json({ dispensaries });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
