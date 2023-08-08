import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

const getStrains = async (
  skip: number,
  take: number,
  userId: string,
  filterName = 'az'
) => {
  try {
    let filter: object;

    switch (filterName) {
      case 'az':
        filter = { name: 'asc' };
        break;

      case 're':
        filter = {
          likes: {
            _count: 'desc',
          },
        };
        break;

      case 'za':
        filter = { name: 'desc' };
        break;

      case 'mr':
        filter = {
          comments: {
            _count: 'desc',
          },
        };
        break;
      default:
        filter = {
          likes: {
            _count: 'desc',
          },
        };
        break;
    }

    const strains = await prisma.strain.findMany({
      skip: skip,
      take: take,
      orderBy: filter,
      include: {
        likes: {
          where: {
            userId: userId,
          },
        },
      },
    });

    return strains;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

const getCount = async () => {
  try {
    const strain = await prisma.strain.count({});
    return strain;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      page: number;
      take: number;
      filter: string;
    };
    const { page, take, filter } = body;
    if (!page || !take) return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);

    const user = session
      ? await prisma.user.findUnique({
          where: {
            email: session?.user?.email || undefined,
          },
        })
      : undefined;

    const count = await getCount();
    if (count === null) return new Error('Error fetching count.');

    const strains = user
      ? await getStrains((page - 1) * take, take, user?.id, filter)
      : await getStrains((page - 1) * take, take, '', filter);

    if (strains === null) return NextResponse.json({ error: 'Error fetching strains.' }, { status: 500 });

    const totalPages = Math.ceil(count / take);

    return NextResponse.json({
      strains: strains,
      page: page,
      totalPages: totalPages,
    });
    } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
