import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
