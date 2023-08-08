import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import { generateHTML } from './generateHTML';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { dispensaryId: string };
    const { dispensaryId } = body;
    if (!dispensaryId)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });
    if (!session || !user || !user?.email)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.dispensaryNotify === false)
      return NextResponse.json({ success: 'silent' });

    const dispensary = await prisma.dispensary.findUnique({
      where: {
        id: dispensaryId,
      },
      include: {
        subscriptions: {
          where: {
            userId: user.id,
          },
        },
      },
    });

    if (!dispensary || !dispensary.name)
      return NextResponse.json(
        { error: 'Dispensary not found' },
        { status: 500 }
      );

    if (dispensary.subscriptions.length < 1)
      return NextResponse.json(
        { error: 'You are not subscribed to this dispensary' },
        { status: 500 }
      );

    import('nodemailer').then(async (nodemailer) => {
      // NOTE: You are not required to use `nodemailer`, use whatever you want.
      const transport = nodemailer.createTransport(process.env.EMAIL_SERVER);
      const result = await transport.sendMail({
        to: user.email || '',
        from: process.env.EMAIL_FROM,
        subject: 'Notification from leafbase.xyz',
        html: generateHTML(dispensary),
      });
      const failed = result.rejected.concat(result.pending).filter(Boolean);
      if (failed.length) {
        return NextResponse.json(
          { error: 'Email could not be sent' },
          { status: 500 }
        );
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
