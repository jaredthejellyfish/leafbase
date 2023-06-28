"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { BsDiscord, BsTwitch, BsSpotify } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {};

const LoginPage = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Successfully signed in!");
      router.push("/");
    }
  }, [status, router]);

  return (
    <div
      style={{ minHeight: "calc(100vh - 145px)" }}
      className="flex items-center justify-center px-5 dark:bg-black"
    >
      <div className="flex flex-col items-center justify-center w-full gap-3 px-8 py-10 rounded-lg shadow-lg md:w-96 dark:bg-zinc-900">
        <h1 className="mb-2 text-xl font-medium dark:text-white">Sign in</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            signIn("email", { email: data.email });
          }}
          className="w-full"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-zinc-500 dark:text-zinc-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="email-address-icon"
              name="email"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
              placeholder="name@leafbase.com"
            />
          </div>
          <button className="flex items-center justify-center w-full py-2 mt-3 text-sm text-green-700 transition border border-green-700 rounded dark:hover:bg-zinc-500 dark:hover:text-white hover:bg-green-700 hover:text-white dark:border-zinc-500 dark:text-zinc-500">
            <p>Sign in with Email</p>
          </button>

          <div className="flex items-center justify-center mt-5 text-zinc-400">
            <p className="text-xs md:text-sm">────────── or ──────────</p>
          </div>
        </form>
        <div className="flex flex-row gap-6 mt-3">
          <button
            className="flex items-center justify-center w-12 h-12 text-red-600 transition bg-white rounded shadow-md hover:scale-105"
            onClick={() => signIn("google")}
          >
            <Image
              height={30}
              width={30}
              src={"https://developers.google.com/identity/images/g-logo.png"}
              alt="Google sso button."
            />
          </button>
          <button
            style={{ backgroundColor: "#000000" }}
            onClick={() => signIn("github")}
            className="flex items-center justify-center w-12 h-12 text-white transition bg-white rounded shadow-md hover:scale-105"
          >
            <AiFillGithub size={30} />
          </button>
          <button
            onClick={() => signIn("discord")}
            style={{ backgroundColor: "#7289da" }}
            className="flex items-center justify-center w-12 h-12 text-white transition bg-white rounded shadow-md hover:scale-105"
          >
            <BsDiscord size={30} />
          </button>
          <button
            onClick={() => signIn("twitch")}
            style={{ backgroundColor: "#9146FF" }}
            className="flex items-center justify-center w-12 h-12 text-white transition bg-white rounded shadow-md hover:scale-105"
          >
            <BsTwitch size={30} />
          </button>
          <button
            style={{ backgroundColor: "#000000", color: "#1EB954" }}
            onClick={() => signIn("spotify")}
            className="flex items-center justify-center w-12 h-12 text-white transition bg-white rounded shadow-md hover:scale-105"
          >
            <BsSpotify size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
