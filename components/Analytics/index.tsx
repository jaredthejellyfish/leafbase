// components/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';
import React from 'react';

export default function Analytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID?: string;
}) {
  const measurementId = GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GTM;

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${measurementId}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}
