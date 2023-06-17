import React from 'react'

const StrainPageLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-1/4">
      <nav className="flex ml-1 w-full md:w-4/5 mb-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <div
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
              <div
                className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400"
              >
                Strains
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
            </div>
          </li>
        </ol>
      </nav>
      <div
        id="card"
        className="md:w-4/5 flex flex-col items-center justify-center border-zinc-300 dark:border-transparent dark:bg-zinc-900 shadow border rounded-xl pb-8 w-full"
      >
        <div
          id="header"
          className="flex items-center justify-center md:flex-row flex-col gap-8 pt-8 px-5 md:px-8 w-full"
        >
          <div
            id="vertical-1"
            className="md:w-1/3 h-52 flex items-center justify-center"
          >
            <div className="h-48 w-48 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
          </div>
          <div id="vertical-2" className="md:w-2/3 w-full">
            <div className="h-4 w-16 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <div className="h-6 w-32 mt-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <div className="h-4 w-48 mt-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <div className="h-4 w-20 mt-2 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <div className="h-4 w-20 mt-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            <div className="h-4 w-40 mt-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
          </div>
        </div>
        <div
          id="body"
          className="flex justify-center md:flex-row flex-col gap-8 px-5 md:px-8 w-full"
        >
          <div className="md:w-1/3 mt-3">
            <div className="flex flex-col border border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7 p-2 px-3 rounded gap-2">
              <div className="h-4 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="h-3 w-2/4 mt-1 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="space-y-2 mt-1">
              <div className="h-3 w-2/3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-3/4 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-2/5 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-3/5 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-2/3 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              <div className="w-2/4 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrainPageLoading;
