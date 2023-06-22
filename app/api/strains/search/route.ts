import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const search = searchParams.get("query");

    if (!search)
      return NextResponse.json({ error: "No search query provided" });

    const foundStrains = await prisma.strain.findMany({
      take: 5,
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        slug: true,
        id: true,
      },
    });

    if (!foundStrains || foundStrains.length < 1)
      return NextResponse.json({ error: "No strains found" });

    return NextResponse.json({ strains: foundStrains });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = "force-dynamic";
