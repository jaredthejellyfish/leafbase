import prisma from "@/lib/prisma";
import useServerUser from "./useServerUser";

type User = {
  id: string;
};

const getStrains = async (skip: number, take: number, userId: string) => {
  try {
    const strains = await prisma.strain.findMany({
      skip: skip,
      take: take,
      include: {
        Like: {
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

const useServerStrains = async (page: number, take: number) => {
  const user = await useServerUser();
  if (user === null) return {strains: null, error: true};

  const count = await getCount();
  if (count === null) return {strains: null, error: true};

  const strains = await getStrains((page - 1) * take, take, user.id);
  if (strains === null) return {strains: null, error: true};


  return { strains, count, error: false };
};

export default useServerStrains;
