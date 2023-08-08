import { NextRequest, NextResponse } from 'next/server';

import { geoIpLocation } from '@/types/interfaces';

const ipAddressPattern =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function getIPAddress(headers: NextRequest['headers']) {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');
  const host = headers.get('host');
  let ipAddress = '83.51.245.72';

  if (forwardedFor && ipAddressPattern.test(forwardedFor)) {
    ipAddress = forwardedFor.split(',')[0].trim();
  }

  if (realIP && ipAddressPattern.test(realIP)) {
    ipAddress = realIP;
  }

  if (host && ipAddressPattern.test(host)) {
    ipAddress = host.replace(/\[|\]/g, '');
  }

  return ipAddress;
}

const getIpLocation = async (ip: string) => {
  const url = `http://ip-api.com/json/${ip}`;
  console.log(url);
  const res = await fetch(url);

  if (res.ok) {
    const geodata = (await res.json()) as geoIpLocation;

    if (
      !geodata ||
      (geodata?.location?.status && geodata?.location?.status === 'fail')
    )
      throw new Error('Error fetching ip location');

    return geodata;
  }
};

export async function GET(req: NextRequest) {
  try {
    const ip = getIPAddress(req.headers);
    const location = await getIpLocation(ip);

    return NextResponse.json({ location });
    } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
