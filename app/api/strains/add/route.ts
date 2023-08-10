import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

interface NewStrain {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  phenotype: string;
  averageRating: number;
  shortDescription: string;
  description: string;
  nugImage: string;
  flowerImageSvg: string;
  topTerpene: string;
  thcPercent: number;
  topEffect: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewStrain;

    const {
      slug,
      name,
      subtitle,
      category,
      phenotype,
      averageRating,
      shortDescription,
      description,
      nugImage,
      flowerImageSvg,
      topTerpene,
      thcPercent,
      topEffect,
    } = body;

    if (
      !slug ||
      !name ||
      !subtitle ||
      !phenotype ||
      !averageRating ||
      !description ||
      !nugImage ||
      !topTerpene ||
      !thcPercent ||
      !topEffect
    )
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    if (!session?.user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const strain = await prisma.strain.create({
      data: {
        slug,
        name,
        subtitle,
        category,
        phenotype,
        averageRating,
        shortDescription,
        description,
        nugImage,
        flowerImageSvg,
        topTerpene,
        thcPercent,
        topEffect,
      },
    });

    return NextResponse.json({ strain });
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
