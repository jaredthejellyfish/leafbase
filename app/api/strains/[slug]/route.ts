import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const strain = await prisma.strain.findUnique({
      where: {
        slug: slug,
      },
    });

    return NextResponse.json({ strain });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
