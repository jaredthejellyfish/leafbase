import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
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

const getUserByDisplayName = async (displayName: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        displayName: displayName,
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

export default async function useServerUser(displayName?: string) {
  if (displayName) return await getUserByDisplayName(displayName);

  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    return await getUserByEmail(session?.user?.email);
  } else {
    return null;
  }
}
