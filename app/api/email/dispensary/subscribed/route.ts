import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/auth/authOptions';
import { generateHTML } from './generateHTML';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { dispensaryId: string };
    const { dispensaryId } = body;
    if (!dispensaryId) throw new Error('Invalid request.');

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });
    if (!session || !user || !user?.email) throw new Error('Unauthorized.');
    if (user.dispensaryNotify === false) return NextResponse.json({ success: true });

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
      throw new Error('Dispensary not found.');

    if (dispensary.subscriptions.length < 1)
      throw new Error('You are not following this dispensary.');

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
        throw new Error(`Email to ${user.id} could not be sent`);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';
