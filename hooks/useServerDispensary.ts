import prisma from '@/lib/prisma';

const getDispensaryFromSlug = async (slug: string) => {
  try {
    const dispensary = await prisma.dispensary.findUnique({
      where: {
        slug: slug,
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

const useServerDispensary = async (slug: string) => {
  const dispensary = await getDispensaryFromSlug(slug);
  if (dispensary === null) return { dispensary: null, error: true };

  return { dispensary, error: false };
};

export default useServerDispensary;
