"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { BsDiscord, BsTwitch, BsSpotify } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {};

const LoginPage = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (session?.user?.name && showToast) {
      toast.success(`Welcome back ${session?.user?.name?.split(" ")[0]}! 🎉`);
      setShowToast(false);
      router.push("/");
    }
  }, [router, session, showToast]);

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
            <div className="relative">
              <input
                type="text"
                id="default_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-zinc-300 appearance-none dark:text-white dark:border-zinc-500 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-700 peer border "
                name="email"
                placeholder=" "
              />
              <label className=" rounded absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-zinc-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Enter your email...
              </label>
            </div>
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
