'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
    <div className="fixed top-0 w-full h-screen z-50 px-6 bg-zinc-800/75 overflow-y-hidden flex items-center justify-center border-transparent">
      <div className="bg-zinc-800 z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-transparent">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-transparent">
          <h2 className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-100">
            Cookies Policy
          </h2>
          <div className="mt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We use cookies to enhance your experience. By continuing to visit
              this site you agree to our use of cookies.
            </p>
          </div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-700/20 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() => setCookieConsent(true)}
            className="items-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Accept
          </button>
          <button
            onClick={() => setCookieConsent(false)}
            className="items-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(CookieBanner), {
  ssr: false,
});
