import { getServerSession } from 'next-auth/next';
import { Strain } from '@prisma/client';
import { User } from '@prisma/client';

import { authOptions } from '@/auth/authOptions';
import useServerUser from './useServerUser';
import prisma from '@/lib/prisma';

type Props = {
  strainID: string;
};

const getIsLiked = async (user: User, strainID: string) => {
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
    const isLiked = likedStrains.some(
      (strain: Strain) => strain.id === strainID
    );
    return isLiked;
  } catch (error) {
    console.log(error);
  }
};

export default async function useIsLiked(props: Props) {
  const user = await useServerUser();
  const session = await getServerSession(authOptions);

  if (!user) {
    return { isLiked: false, user: false, session: false };
  }
  const isLiked = await getIsLiked(user, props.strainID);

  return { isLiked: isLiked, user: user, session: session };
}
