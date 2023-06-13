"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-16">

    </main>
  );
}
