import prisma from '@/lib/prisma';

const getDispensaryFromSlug = async (slug: string) => {
  try {
    const dispensary = await prisma.dispensary.findUnique({
      where: {
        slug: slug,
      },
      include: {
        menus: {
          select: {
            createdAt: true,
            strains: true,
            prices: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return dispensary;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

const getServerDispensary = async (slug: string) => {
  const dispensary = await getDispensaryFromSlug(slug);
  if (dispensary === null) return { dispensary: null, error: true };

  return { dispensary, error: false };
};

export default getServerDispensary;
