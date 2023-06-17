import prisma from "@/lib/prisma";
import useServerUser from "./useServerUser";

type Props = {
  strainID: string;
};

const getIsLiked = async (user: any, strainID: string) => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: user.id,
      },
      include: {
        strain: true,
      },
    });
    const likedStrains = likes.map((like) => like.strain);
    const isLiked = likedStrains.some((strain) => strain.id === strainID);
    return isLiked;
  } catch (error) {
    console.log(error);
  }
};

export default async function useIsLiked(props: Props) {
  const user = await useServerUser();

  if (!user) {
    return false;
  }
  const isLiked = await getIsLiked(user, props.strainID);

  return isLiked;
}
