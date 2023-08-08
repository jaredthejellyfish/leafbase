import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

interface DispensaryUpdate {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  email?: string;
  hours?: string;
  latitude?: number;
  longitude?: number;
  averageRating?: number;
  image?: string;
  logo?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DispensaryUpdate;

    if (!body || !body.name)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!user)
      return NextResponse.json({ error: 'User not found.' }, { status: 500 });

    const dispensary = await prisma.dispensary.create({
      data: {
        name: body.name,
        description: body.description,
        address: body.address,
        city: body.city,
        phone: body.phone,
        website: body.website,
        email: body.email,
        hours: body.hours,
        latitude: body.latitude,
        longitude: body.longitude,
        averageRating: body.averageRating,
        image: body.image,
        logo: body.logo,
        slug: body.name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, ''),
      },
    });

    return NextResponse.json({ dispensary });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
