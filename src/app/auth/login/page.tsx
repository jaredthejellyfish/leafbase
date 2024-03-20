import type { Metadata } from 'next';
import React from 'react';

import LoginForm from '@c/LoginForm';

export const metadata: Metadata = {
  title: 'Leafbase - Login',
};

export default function LoginPage() {
  return (
    <main className="w-full h-screen absolute top-0 flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
