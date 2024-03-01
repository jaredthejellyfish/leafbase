"use client";

import navDropdownStore from "@/lib/store/nav-dropdown";
import { cn } from "@/lib/utils/cn";
import React, { useEffect, useState } from "react";

function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggle = navDropdownStore((state) => state.toggle);

  useEffect(() => {
    toggle(open);
  }, [open, toggle]);

  return (
    <svg
      className="text-dark select-none rounded transition-colors hover:cursor-pointer hover:bg-gray-300 dark:text-white dark:hover:bg-zinc-700"
      width={27}
      height={27}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setOpen(!open)}
    >
      <path
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        className={cn(
          "transition-transform",
          open && "-translate-y-[0.5px] translate-x-[6.5px] rotate-45",
        )}
      ></path>
      <path
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        className={open ? "hidden" : ""}
      ></path>
      <path
        d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        className={cn(
          "transition-transform",
          open && "-translate-x-[7.5px] translate-y-[6.5px] -rotate-45",
        )}
      ></path>
    </svg>
  );
}

export default HamburgerMenu;
