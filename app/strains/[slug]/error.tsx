"use client";
import { BiErrorCircle } from "react-icons/bi";
import React from "react";

const ErrorStrainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-1/4">
      <nav className="flex w-full mb-2 ml-1 md:w-4/5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {/* Navigation code identical to loading page */}
        </ol>
      </nav>
      <div
        id="card"
        className="flex flex-col items-center justify-center w-full pb-8 border shadow md:w-4/5 border-zinc-300 dark:border-transparent dark:bg-zinc-900 rounded-xl"
      >
        <div
          id="header"
          className="flex flex-col items-center justify-center w-full gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex items-center justify-center md:w-1/3 h-52"
          >
            <div className="flex items-center justify-center w-48 h-48 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse">
              <BiErrorCircle className="text-white" size={94} />
            </div>
          </div>
          <div id="vertical-2" className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-400">
              Error
            </h1>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-400">
              There was an error loading this page. Please try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorStrainPage;
