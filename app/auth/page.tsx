import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import Image from "next/image";
import { BsDiscord, BsTwitch } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

type Props = {};

const page = async (props: Props) => {
  const csrf = await getCsrfToken();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white shadow-md rounded-xl">
        <h1 className="mb-8 text-2xl font-bold text-center">Sign in</h1>
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrf} />
          <div className="mt-4">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="name@leafbase.com"
            />
          </div>
          <button className="w-full p-2 mt-4 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800">
            Sign in with Email
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400">
            or
          </div>
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100">
            <Image
              height={28}
              width={28}
              src={"https://developers.google.com/identity/images/g-logo.png"}
              alt="Google SSO button"
            />
          </button>
          <button
            style={{ backgroundColor: "#000" }}
            className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-lg hover:bg-gray-800"
          >
            <AiFillGithub size={24} />
          </button>
          <button
            style={{ backgroundColor: "#7289da" }}
            className="flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-blue-800"
          >
            <BsDiscord size={24} />
          </button>
          <button
            style={{ backgroundColor: "#9146FF" }}
            className="flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-purple-800"
          >
            <BsTwitch size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
