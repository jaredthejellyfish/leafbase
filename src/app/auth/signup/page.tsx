import type { Metadata } from 'next';
import React from 'react';

import SignupForm from '@c/SignupForm';

export const metadata: Metadata = {
  title: 'Leafbase - Sign Up',
};

function SignupPage() {
  return (
    <main className="w-full h-screen absolute top-0 flex items-center justify-center">
      <SignupForm />
    </main>
  );
}

export default SignupPage;
