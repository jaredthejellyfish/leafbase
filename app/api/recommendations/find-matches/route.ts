import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

const fetchRecommendedStrainsData = async (strainName: string) => {
  const res = await fetch(`${process.env.LEAFBASE_API_URL}/find-matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: strainName,
    }),
  });
  const data = await res.json();

  return data;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name) throw new Error("Invalid request.");

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error("Unauthorized.");

    const recommendedStrainsData = await fetchRecommendedStrainsData(name);

    return NextResponse.json({ recommendedStrainsData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
