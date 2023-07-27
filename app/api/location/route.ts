import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import requestIp from 'request-ip';
import { Request } from 'request-ip';
import geoip from 'geoip-lite';

export async function POST(request: Request) {
  try {
    const clientIp: string =
      requestIp
        .getClientIp(request)
        ?.replace('::1', '')
        ?.replace('127.0.0.1', '') || '72.1.69.153';

    const geo = geoip.lookup(clientIp);

    return NextResponse.json({ clientIp, geo });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
