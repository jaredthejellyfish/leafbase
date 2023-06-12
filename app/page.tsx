"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        <button onClick={() => signOut()}>Sign Out</button>
        <br />
        <Link href={"/profile"}>Profile</Link>
        <br />
        <button onClick={() => toast.success("Yas queen!")}>toast</button>
      </h1>
      <p>{JSON.stringify(session)}</p>
    </main>
  );
}
