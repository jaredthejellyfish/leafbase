import useServerUser from './useServerUser';
import prisma from '@/lib/prisma';

const getStrainsWithUser = async (
  skip: number,
  take: number,
  userId: string,
  filterName: string
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

const useServerStrains = async (page: number, take: number, filter = 're') => {
  const user = await useServerUser();

  const count = await getCount();
  if (count === null) return { strains: null, error: true };

  const strains = await getStrainsWithUser(
    (page - 1) * take,
    take,
    user?.id || '',
    filter
  );
  if (strains === null) return { strains: null, error: true };

  return { strains, count, error: false };
};

export default useServerStrains;
