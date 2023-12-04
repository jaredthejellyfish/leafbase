import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { cookies } from 'next/headers';
import React from 'react';

import type { DatabaseStrain } from '@/lib/database/database_types';
import { terpenes, effects } from '@/lib/data/colors';
import type { Database } from '@/lib/database';

export const alt = 'Leafbase strain image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies(),
  });

  const { data: strain } = await supabase
    .from('strains')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle<DatabaseStrain>();

  if (!strain) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const description =
    strain.shortDescription && strain.shortDescription.length > 0
      ? strain.shortDescription.slice(0, 100) +
        (strain.shortDescription.length > 100 ? '...' : '')
      : 'leafbase.xyz';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 60,
          color: 'white',
          backgroundColor: '#27272a',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#18181b',
            borderRadius: '5%',
            margin: '0 30px 0 0',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              strain.nugImage ||
              'https://leafbase.xyz/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F9cae247c-4278-4498-9df5-9cdef91dabd5-lvcvno.png&w=640&q=75'
            }
            alt={strain.name}
            width={450}
            height={450}
            style={{ border: '3px solid #3f3f46', borderRadius: '5%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {strain.phenotype && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}
            >
              <div
                style={{
                  border: '1px solid #3f3f46',
                  backgroundColor: '#52525b',
                  padding: '10px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: 35,
                  margin: '0 0 0 0',
                }}
              >
                {strain.phenotype}
              </div>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 70, fontWeight: '600' }}>{strain.name}</div>
            <div
              style={{
                fontSize: '32px',

                maxWidth: '600px',
                height: '120',
                fontWeight: '300',
              }}
            >
              {description}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '32px',

                maxWidth: '600px',
                fontWeight: '600',
                margin: '20px 0 0',
              }}
            >
              THC:
              <div
                style={{
                  display: 'flex',
                  fontSize: '32px',

                  maxWidth: '600px',
                  fontWeight: '300',
                  margin: '0 0 15px 10px',
                }}
              >
                32%
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                margin: '0 0 10px 0',
              }}
            >
              <div
                style={{
                  backgroundColor: terpenes[strain.topTerpene || 'null'],
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                }}
              ></div>
              <div style={{ fontSize: '29px', margin: '0 0 0 15px' }}>
                {strain.topTerpene}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: effects[strain.topEffect || 'null'],
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                }}
              ></div>
              <div style={{ fontSize: '29px', margin: '0 0 0 15px' }}>
                {strain.topEffect}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
