import Link from "next/link";
import stoner from "@/public/stoner.png";
import Image from "next/image";
import { RxCaretLeft } from "react-icons/rx";

export default function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center gap-8">
      <Image src={stoner} alt="Stoner" />
      <div className="flex flex-col items-center justify-center gap-3 ">
        <h1 className="text-4xl font-bold">Page not found.</h1>
        <p className="text-gray-500 text-xl font-normal text-center">
          Oops! Looks like you followed a bad link. If you think this is a
          problem with us, please tell us.
        </p>
      </div>
      <Link
        href="/"
        className="bg-green-700 py-2 px-0 rounded flex flex-row w-40 items-center justify-center gap-2 text-white"
      >
        <RxCaretLeft size={22} />
        Go back home
      </Link>
    </div>
  );
}
