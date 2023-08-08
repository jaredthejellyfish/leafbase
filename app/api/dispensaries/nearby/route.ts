import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      lat?: string;
      lon?: string;
      city?: string;
    };
    const { lat, lon, city } = body;

    const withCoords = lat &&
      lon && {
        AND: [
          {
            latitude: {
              gte: parseFloat(lat) - 0.1,
              lte: parseFloat(lat) + 0.1,
            },
          },
          {
            longitude: {
              gte: parseFloat(lon) - 0.1,
              lte: parseFloat(lon) + 0.1,
            },
          },
        ],
      };

    const withoutCoords = !lat &&
      !lon &&
      city && {
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
        address: true,
        city: true,
        latitude: true,
        longitude: true,
        menus: {
          select: {
            strains: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            prices: true,
          },
        },
      },
    });

    return NextResponse.json({ dispensaries });
    } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
