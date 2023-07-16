import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

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
    const body = await request.json();
    const { page, take, filter } = body;
    if (!page || !take) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error('Unauthorized.');

    const count = await getCount();
    if (count === null) return new Error('Error fetching count.');

    const strains = await getStrains((page - 1) * take, take, user?.id, filter);
    if (strains === null) throw new Error('Error fetching strains.');

    const totalPages = Math.ceil(count / take);

    return NextResponse.json({
      strains: strains,
      page: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
