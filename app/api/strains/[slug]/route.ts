import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { StrainExtended } from "@/types/interfaces";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const strain = (await prisma.strain.findUnique({
      where: {
        slug: slug,
      },
    })) as StrainExtended;

    return NextResponse.json({ strain });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = "force-dynamic";
