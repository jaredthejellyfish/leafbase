import React from 'react';

type Props = {
  urls: {
    name: string;
    url?: string;
  }[];
};

const NavBreadcrumbsSkeleton = (props: Props) => {
  if (!props.urls) return null;
  return (
    <nav className="mb-2 ml-1 flex w-full md:w-4/5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <div className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
            <svg
              aria-hidden="true"
              className="mr-2 size-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </div>
        </li>

        {/* Map over all urls except for the first one */}
        {props.urls.length >= 1 &&
          props.urls.map((url, index) => (
            <li key={index}>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="size-6 text-gray-400"
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
                <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 md:ml-2">
                  {url.name}
                </div>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default NavBreadcrumbsSkeleton;
