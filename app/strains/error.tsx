"use client";

import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

type Props = {};

const ErrorStrains = async (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 xl:px-52">
      <div className="max-w-4xl">
        <h1 className="mt-4 mb-2 text-3xl font-bold ">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of comments.
        </p>
        <div className="flex items-center justify-between px-1 font-medium">
          <span className="mt-4 text-xs text-zinc-400">6330 strains</span>
          <span className="flex flex-row items-center gap-1 mt-4 text-xs text-zinc-400">
            Sort by
            <span className="flex flex-row items-center cursor-pointer dark:text-zinc-300 text-zinc-500">
              Recommended
            </span>
          </span>
        </div>
        <span className="hidden w-full p-2 mt-1 text-xs border rounded md:block border-zinc-600/50 text-zinc-600">
          These results are based on user comments and are not a substitute for
          professional medical advice.
        </span>
        <div className="flex items-center justify-center mt-10">
          <AiOutlineExclamationCircle size={50} className="text-green-700" />
          <h2 className="ml-4 text-2xl font-bold text-green-700">
            Error loading strains
          </h2>
        </div>
        <p className="mt-4 text-center">
          There was an error while trying to load the strains. Please try again
          later.
        </p>
      </div>
    </div>
  );
};

export default ErrorStrains;
