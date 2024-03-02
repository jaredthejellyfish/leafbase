"use client";

import { AiOutlineClose } from "react-icons/ai";
import { useOnClickOutside } from "usehooks-ts";

import { cn } from "@/lib/utils/cn";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  containerClass?: string;
  noTitle?: boolean;
  onModalClose?: () => void;
} & ({ noTitle: true } | { noTitle?: false; title: string });

function Modal({
  children,
  open,
  setOpen,
  title,
  containerClass,
  onModalClose,
  noTitle,
}: Props) {
  const [isOpen, setIsOpen] = useState(open);
  const ref = React.useRef<HTMLDivElement | null>(null);

  function handleClickOutside() {
    setIsOpen(false);
    if (setOpen) setOpen(false);
  }

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
        if (setOpen) setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setOpen]);

  function handdleClose() {
    setIsOpen(false);
    if (onModalClose) onModalClose();
    if (setOpen) setOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex h-screen w-full items-center justify-center overflow-y-hidden border-transparent bg-zinc-900/75 px-6 transition-all duration-500",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        ref={ref}
        className={cn(
          "relative z-50 inline-block w-full transform overflow-hidden rounded-lg border-transparent bg-white text-left align-bottom shadow-xl transition-all duration-300 dark:bg-zinc-800 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle",
          open ? "scale-100" : "scale-0",
          containerClass,
        )}
      >
        <div className="flex w-full flex-row items-center justify-between bg-zinc-200 px-4 py-2 dark:bg-zinc-950/40">
          {!noTitle && (
            <h2 className="mt-0.5 text-lg font-semibold">{title}</h2>
          )}
          <button onClick={() => handdleClose()}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
