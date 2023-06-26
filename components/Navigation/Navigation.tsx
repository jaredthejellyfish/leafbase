import React from "react";
import Image from "next/image";
import Link from "next/link";
import md5 from "md5";
import NavigationThemeSelect from "./NavigationThemeSelect";
import SearchBar from "../SearchBar/SearchBar";
import { User } from "@prisma/client";
import useServerUser from "@/hooks/useServerUser";
import NavigationHamburgerMenu from "./NavigationHamburgerMenu";
import NavigationDropdown from "./NavigationDropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";

type Props = {};

const generateGravatarUrl = (user: User): string => {
  if (user?.image) return user.image;
  return `https://www.gravatar.com/avatar/${md5(
    user?.name || "NaN"
  )}?d=identicon`;
};

const Navigation = async () => {
  const user = await useServerUser();
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed z-50 w-screen h-16 text-black drop-shadow-lg dark:text-white">
      <div className="relative z-50 grid h-full grid-cols-3 grid-rows-1 gap-0 px-6 bg-gray-100 md:px-16 dark:bg-zinc-900">
        <div className="flex items-center justify-start col-span-1">
          <Link
            href="/"
            className="flex items-center justify-start gap-5 text-xl"
          >
            <Image
              src="https://companieslogo.com/img/orig/LFLY-e243e87c.png?t=1676454310"
              alt="logo"
              width={38}
              height={38}
              priority
            />
            <span className="font-medium ">Leafbase</span>
          </Link>
        </div>
        <div className="flex items-center justify-end col-span-2 gap-4">
          {!session ? (
            <NavigationThemeSelect />
          ) : (
            <>
              <SearchBar />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="20"
                className="hidden stroke-black dark:stroke-white md:block"
              >
                <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
              </svg>
              <NavigationThemeSelect />
              <Link href="/profile">
                <Image
                  className="rounded-full"
                  src={generateGravatarUrl(user as User)}
                  alt="profile"
                  height={32}
                  width={32}
                  priority
                />
              </Link>
              <NavigationHamburgerMenu />
            </>
          )}
        </div>
      </div>
      <NavigationDropdown />
    </nav>
  );
};

export default Navigation;
