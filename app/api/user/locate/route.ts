import { NextRequest, NextResponse } from 'next/server';

function getIPAddress(headers: NextRequest['headers']) {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');
  const host = headers.get('host');

  if (forwardedFor) {
    // The 'x-forwarded-for' header might contain multiple IP addresses separated by commas.
    // The first IP address is usually the client's IP.
    const ipAddress = forwardedFor.split(',')[0].trim();
    return ipAddress;
  }

  if (realIP) {
    return realIP;
  }

  if (host) {
    // If 'host' contains an IP address, we can use that as well.
    // In this case, we need to remove the square brackets if present.
    const ipAddress = host.replace(/\[|\]/g, '');
    return ipAddress;
  }

  // If no valid IP address is found in the headers, return null or any default value as needed.
  return null;
}

export async function GET(req: NextRequest) {
  try {
    console.log(getIPAddress(req.headers));
    return NextResponse.json({ ok: getIPAddress(req.headers) });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
