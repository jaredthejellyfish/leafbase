import React from 'react';

type Props = { color: string; text: string };

interface Badges {
  [key: string]: React.ReactNode;
  default: React.ReactNode;
  dark: React.ReactNode;
  red: React.ReactNode;
  green: React.ReactNode;
  yellow: React.ReactNode;
  indigo: React.ReactNode;
  purple: React.ReactNode;
  pink: React.ReactNode;
}

const Badge = (props: Props) => {
  const { color, text } = props;

  const badges: Badges = {
    default: (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 mx-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
        {text}
      </span>
    ),
    dark: (
      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
        {text}
      </span>
    ),
    red: (
      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        {text}
      </span>
    ),
    green: (
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        {text}
      </span>
    ),
    yellow: (
      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
        {text}
      </span>
    ),
    indigo: (
      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
        {text}
      </span>
    ),
    purple: (
      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
        {text}
      </span>
    ),
    pink: (
      <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
        {text}
      </span>
    ),
  };

  return badges[color] || badges.default;
};

export default Badge;
