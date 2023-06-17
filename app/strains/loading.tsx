import React from "react";
import { RxCaretDown } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";

type Props = {};

const LoadingStrains = async (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center px-6 xl:px-52">
      <div className="max-w-4xl">
        <h1 className=" font-bold text-3xl mb-2 mt-4">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of reviews.
        </p>
        <div className="flex px-1 items-center font-medium justify-between">
          <span className="text-xs mt-4 text-zinc-400">6330 strains</span>
          <span className="flex flex-row items-center gap-1 text-xs mt-4 text-zinc-400">
            Sort by
            <span className="dark:text-zinc-300 text-zinc-500 flex flex-row items-center cursor-pointer">
              Recommended <RxCaretDown size={14} />
            </span>
          </span>
        </div>
        <span className="w-full hidden md:block mt-1 p-2 border border-zinc-600/50 rounded text-xs text-zinc-600">
          These results are based on user reviews and are not a substitute for
          professional medical advice.
        </span>
        <div className="grid md:grid-cols-3 gap-x-4">
          <div className="relative mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5">
            <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
              <AiOutlineHeart />
            </div>
            <div
              style={{ maxHeight: "250px" }}
              className="w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
            ></div>
            <div className="md:w-full w-1/2">
              <div className="w-16 h-6 ml-1 mt-2 bg-gray-200 dark:shadow rounded py-1 text-xs font-medium dark:bg-zinc-700 inline-block"></div>
              <div className="px-1">
                <div className="h-4 w-1/2 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="px-1 h-14 mt-2">
                <div className="h-3 w-4/5 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-3/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
                <div className="h-3 w-3/4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4 h1">
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="w-full flex items-center justify-center text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
                Learn More
              </div>
            </div>
          </div>
          <div className="relative mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5">
            <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
              <AiOutlineHeart />
            </div>
            <div
              style={{ maxHeight: "250px" }}
              className="w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
            ></div>
            <div className="md:w-full w-1/2">
              <div className="w-16 h-6 ml-1 mt-2 bg-gray-200 dark:shadow rounded py-1 text-xs font-medium dark:bg-zinc-700 inline-block"></div>
              <div className="px-1">
                <div className="h-4 w-1/2 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="px-1 h-14 mt-2">
                <div className="h-3 w-4/5 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-3/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
                <div className="h-3 w-3/4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4 h1">
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="w-full flex items-center justify-center text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
                Learn More
              </div>
            </div>
          </div>
          <div className="relative mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5">
            <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
              <AiOutlineHeart />
            </div>
            <div
              style={{ maxHeight: "250px" }}
              className="w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
            ></div>
            <div className="md:w-full w-1/2">
              <div className="w-16 h-6 ml-1 mt-2 bg-gray-200 dark:shadow rounded py-1 text-xs font-medium dark:bg-zinc-700 inline-block"></div>
              <div className="px-1">
                <div className="h-4 w-1/2 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="px-1 h-14 mt-2">
                <div className="h-3 w-4/5 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-3/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
                <div className="h-3 w-3/4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4 h1">
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="w-full flex items-center justify-center text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
                Learn More
              </div>
            </div>
          </div>
          <div className="relative mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5">
            <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
              <AiOutlineHeart />
            </div>
            <div
              style={{ maxHeight: "250px" }}
              className="w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
            ></div>
            <div className="md:w-full w-1/2">
              <div className="w-16 h-6 ml-1 mt-2 bg-gray-200 dark:shadow rounded py-1 text-xs font-medium dark:bg-zinc-700 inline-block"></div>
              <div className="px-1">
                <div className="h-4 w-1/2 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="px-1 h-14 mt-2">
                <div className="h-3 w-4/5 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-3/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
                <div className="h-3 w-3/4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4 h1">
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="w-full flex items-center justify-center text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
                Learn More
              </div>
            </div>
          </div>
          <div className="relative mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5">
            <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
              <AiOutlineHeart />
            </div>
            <div
              style={{ maxHeight: "250px" }}
              className="w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
            ></div>
            <div className="md:w-full w-1/2">
              <div className="w-16 h-6 ml-1 mt-2 bg-gray-200 dark:shadow rounded py-1 text-xs font-medium dark:bg-zinc-700 inline-block"></div>
              <div className="px-1">
                <div className="h-4 w-1/2 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="px-1 h-14 mt-2">
                <div className="h-3 w-4/5 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-3/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
                <div className="h-3 w-3/4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4 h1">
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="w-full flex items-center justify-center text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
                Learn More
              </div>
            </div>
          </div>
          <div className="relative mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5">
            <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
              <AiOutlineHeart />
            </div>
            <div
              style={{ maxHeight: "250px" }}
              className="w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
            ></div>
            <div className="md:w-full w-1/2">
              <div className="w-16 h-6 ml-1 mt-2 bg-gray-200 dark:shadow rounded py-1 text-xs font-medium dark:bg-zinc-700 inline-block"></div>
              <div className="px-1">
                <div className="h-4 w-1/2 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="px-1 h-14 mt-2">
                <div className="h-3 w-4/5 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-3/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
                <div className="h-3 w-3/4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4 h1">
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-2 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
              <div className="w-full flex items-center justify-center text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingStrains;
