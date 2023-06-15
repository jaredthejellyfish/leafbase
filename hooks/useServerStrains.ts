import prisma from "@/lib/prisma";

const getStrains = async (skip: number, take: number) => {
  try {
    const strains = await prisma.strain.findMany({
      skip: skip,
      take: take,
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

const useServerStrains = async (page: number, take: number) => {
  const count = await getCount();
  if (count === null) return {strains: null, error: true};

  const strains = await getStrains((page - 1) * take, take);
  if (strains === null) return {strains: null, error: true};


  return { strains, count, error: false };
};

export default useServerStrains;
