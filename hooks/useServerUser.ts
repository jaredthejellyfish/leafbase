import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      accounts: true,
    },
  });

  return user;
};

export default async function useServerUser() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    return await getUser(session?.user?.email);
  } else {
    return null;
  }
}
