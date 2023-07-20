import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import Link from 'next/link';

async function UserProfileLoading() {
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
                ...
              </div>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <div className="w-20 h-20 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-32 h-4 mt-3 rounded-m bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <span className="flex flex-row items-center gap-1 mt-2 text-sm text-zinc-300">
              <div className="w-16 h-3 mt-0 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </span>
            <span className="mt-3 text-sm dark:text-white">
              Location:
              <div className="flex flex-row items-center gap-1 mb-3 text-sm text-zinc-300">
                <MdLocationPin />
                <div className="w-20 h-3 mt-0.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
            </span>
          </div>
          <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">Comments</h1>
            <div className="flex flex-col gap-2 mt-2">
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <h2 className="mt-4 text-lg">About me</h2>
            <div className="mt-1 space-y-2">
              <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-3/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </div>
            <div className="flex flex-row justify-between mt-6 md:w-4/5">
              <span className="mt-3 text-sm dark:text-white">
                Birthday:
                <div className="h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse w-60"></div>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Languages:
                <div className="h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse w-60"></div>
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <span className="text-xl font-bold ">Liked Strains </span>
            <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
              <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: '90px', maxWidth: '90px' }}
                  className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                ></div>
                <h1 className="text-sm text-semi">
                  <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h1>
              </div>
              <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: '90px', maxWidth: '90px' }}
                  className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                ></div>
                <h1 className="text-sm text-semi">
                  <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h1>
              </div>
              <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: '90px', maxWidth: '90px' }}
                  className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                ></div>
                <h1 className="text-sm text-semi">
                  <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h1>
              </div>
              <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: '90px', maxWidth: '90px' }}
                  className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                ></div>
                <h1 className="text-sm text-semi">
                  <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h1>
              </div>
              <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: '90px', maxWidth: '90px' }}
                  className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                ></div>
                <h1 className="text-sm text-semi">
                  <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h1>
              </div>
              <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
                <div
                  style={{ maxHeight: '90px', maxWidth: '90px' }}
                  className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                ></div>
                <h1 className="text-sm text-semi">
                  <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
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
