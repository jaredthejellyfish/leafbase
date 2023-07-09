import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user?.emailVerified;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export default async function useEmailVerified() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    return await getUserByEmail(session?.user?.email);
  } else {
    return null;
  }
}
