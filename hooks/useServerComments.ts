import prisma from "@/lib/prisma";
import useServerUser from "./useServerUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";
import { User } from "@prisma/client";

interface Props {
  user: User;
}

const getComments = async (user: any) => {
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
