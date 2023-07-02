import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

const fetchLikedStrainsData = async (strainNames: string[]) => {
  const res = await fetch(`${process.env.LEAFBASE_API_URL}/liked-plot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      strains: strainNames,
    }),
  });
  const data = await res.json();

  return data;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { strains } = body;
    if (!strains) throw new Error("Invalid request.");

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!session || !user) throw new Error("Unauthorized.");

    const likedStrainsData = await fetchLikedStrainsData(strains);

    return NextResponse.json({ likedStrainsData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
