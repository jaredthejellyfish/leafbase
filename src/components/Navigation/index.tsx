import Link from "next/link";
import React from "react";
import Image from "next/image";
import SiteLogo from "@p/site-logo.png";

function Navigation() {
  return (
    <nav className="flex h-14 items-center justify-between bg-gray-100 px-6 sm:h-16 dark:bg-zinc-900">
      <div>
        <Link
          href="/"
          className="flex items-center justify-start gap-2.5 text-xl sm:gap-4"
        >
          <Image
            className="aspect-square rounded-sm border border-zinc-300 bg-white sm:scale-125 dark:border-zinc-700 dark:bg-zinc-700/60"
            src={SiteLogo}
            height={33}
            width={33}
            alt="site logo"
          />
          <span className="text-base font-medium sm:text-xl">Leafbase</span>
        </Link>
      </div>
      <div className="w-1/2"></div>
    </nav>
  );
}

export default Navigation;
