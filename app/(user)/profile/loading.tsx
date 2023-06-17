import React from "react";
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

type Props = {};

async function UserProfileLoading(props: Props) {
  return (
    <div className="flex flex-col px-6 md:px-16">
      <nav className="flex ml-1" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                Profile
              </div>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 mt-3">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="flex flex-col p-7 rounded-xl shadow-md dark:bg-zinc-900 w-full">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <div className="w-20 h-4 mt-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <p className="text-lg font-bold mt-2 "> </p>
            <span className="text-zinc-300 text-sm flex-row flex items-center justiffy-center gap-1">
              <MdLocationPin />
              <div className="w-20 h-3 mt-0.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </span>
            <span className="mt-4 text-sm dark:text-white">
              Email Address:
              <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </span>
            <span className="mt-3 text-sm dark:text-white">
              Phone number:
              <div className="h-3 w-1/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </span>
            <button
              type="button"
              disabled
              className="mt-5 text-white bg-green-700 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-700 focus:outline-none "
            >
              ...
            </button>
          </div>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col p-7 rounded-xl shadow-md w-full dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <h2 className="text-lg mt-4">About me</h2>
            <div className="space-y-2 mt-1">
              <div className="h-3 w-2/3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-3/4 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-2/5 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-3/5 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-2/3 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-2/4 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </div>
            <div className="flex flex-row justify-between md:w-4/5 mt-6">
              <span className="mt-3 text-sm dark:text-white">
                Birthday:
                <div className="h-3 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md w-60"></div>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Languages:
                <div className="h-3 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md w-60"></div>
              </span>
            </div>
          </div>
          <div className="flex flex-col p-7 rounded-xl shadow-md w-full dark:bg-zinc-900">
            <span className="text-xl font-bold ">Liked Strains </span>
            <div className="flex flex-row flex-wrap items-center justify-center md:justify-start mt-3 gap-y-3">
              <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="aspect-square bg-white flex items-center justify-center rounded-md w-24"
                ></div>
                <h1 className="text-semi text-sm">
                  <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                </h1>
              </div>
              <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="aspect-square bg-white flex items-center justify-center rounded-md w-24"
                ></div>
                <h1 className="text-semi text-sm">
                  <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                </h1>
              </div>
              <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="aspect-square bg-white flex items-center justify-center rounded-md w-24"
                ></div>
                <h1 className="text-semi text-sm">
                  <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                </h1>
              </div>
              <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="aspect-square bg-white flex items-center justify-center rounded-md w-24"
                ></div>
                <h1 className="text-semi text-sm">
                  <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                </h1>
              </div>
              <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="aspect-square bg-white flex items-center justify-center rounded-md w-24"
                ></div>
                <h1 className="text-semi text-sm">
                  <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileLoading;
