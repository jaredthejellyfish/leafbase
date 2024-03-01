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
      <span className="mx-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
        {text}
      </span>
    ),
    dark: (
      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
        {text}
      </span>
    ),
    red: (
      <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
        {text}
      </span>
    ),
    green: (
      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
        {text}
      </span>
    ),
    yellow: (
      <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
        {text}
      </span>
    ),
    indigo: (
      <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
        {text}
      </span>
    ),
    purple: (
      <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
        {text}
      </span>
    ),
    pink: (
      <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
        {text}
      </span>
    ),
  };

  return badges[color] ?? badges.default;
};

export default Badge;
