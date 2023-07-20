import prisma from '@/lib/prisma';
import { User, Like } from '@prisma/client';

interface StrainName {
  name: string;
  slug: string;
}

interface Comment {
  id: string;
  userId: string;
  strainId: string;
  body: string;
  createdAt: Date;
  strain: StrainName;
  likes?: Like[];
}

const getComments = async (user: User) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        likes: {
          where: {
            userId: user.id,
          },
        },
        strain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    console.log(error);
  }
};

export default async function useServerComments(user: User) {
  if (!user) {
    return { comments: null, isError: true };
  }
  const comments = (await getComments(user)) as unknown as Comment[];

  return { comments: comments, isError: false };
}
