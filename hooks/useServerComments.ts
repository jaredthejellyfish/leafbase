import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

const getComments = async (user: User) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: user.id,
      },
      include: {
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
  const comments = await getComments(user);

  return { comments: comments, isError: false };
}
