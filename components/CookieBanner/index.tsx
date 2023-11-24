'use client';

import React, { useEffect, useState } from 'react';

function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean>(
    localStorage.getItem('cookie_consent') === 'true'
  );

  useEffect(() => {
    if (window) {
      const newValue = cookieConsent ? 'granted' : 'denied';

      if (
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' &&
        typeof window.gtag !== 'undefined'
      ) {
        window.gtag('consent', 'update', {
          analytics_storage: newValue,
        });
      }

      localStorage.setItem('cookie_consent', JSON.stringify(cookieConsent));
    }
  }, [cookieConsent]);

  if (cookieConsent) return null;

  return (
    <div
      className="fixed top-0 z-50 flex h-screen w-full items-center justify-center overflow-y-hidden border-transparent bg-zinc-800/75 px-6"
      id="cookie-consent"
    >
      <div className="z-50 inline-block overflow-hidden rounded-lg border-transparent bg-white text-left align-bottom shadow-xl transition-all dark:bg-zinc-800 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div className="bg-white px-4 pb-4 pt-5 dark:bg-transparent sm:p-6 sm:pb-4">
          <h2 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
            Cookies Policy
          </h2>
          <div className="mt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We use cookies to enhance your experience. By continuing to visit
              this site you agree to our use of cookies.
            </p>
          </div>
        </div>
        <div className="bg-zinc-50 px-4 py-3 dark:bg-zinc-700/20 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            id="cookie-consent-accept"
            onClick={() => setCookieConsent(true)}
            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm ring-offset-background transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Accept
          </button>
          <button
            id="cookie-consent-decline"
            onClick={() => {
              setCookieConsent(false);
              window.location.href = 'https://google.com';
            }}
            className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-base font-medium text-zinc-700 shadow-sm ring-offset-background transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
