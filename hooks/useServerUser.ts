import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export default async function useServerUser() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    return await getUser(session?.user?.email);
  } else {
    return null;
  }
}
