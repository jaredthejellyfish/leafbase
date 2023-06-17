import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import StarRating from "@/components/StarRating/StarRating";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { TbMedicalCross } from "react-icons/tb";
import Link from "next/link";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const strains = await prisma.strain.findMany({});

  return strains.map((strain) => ({
    slug: strain.slug,
  }));
}

const getStrainBySlug = async (slug: string) => {
  try {
    const strain = await prisma.strain.findUnique({
      where: {
        slug: slug,
      },
    });

    return strain;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

const StrainPage = async (props: Props) => {
  const strain = await getStrainBySlug(props.params.slug);
  if (!strain) return <div>Error not found</div>;

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-1/4">
      <nav className="flex ml-1 w-full md:w-4/5 mb-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
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
            </Link>
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
              <Link
                href={"/strains"}
                className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400"
              >
                Strains
              </Link>
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
              <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                {strain?.name}
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <div
        id="card"
        className="md:w-4/5 flex flex-col items-center justify-center border-zinc-300 dark:border-transparent dark:bg-zinc-900 shadow border rounded pb-8"
      >
        <div
          id="header"
          className="flex items-center justify-center md:flex-row flex-col gap-8 pt-8 px-5 md:px-8 w-full"
        >
          <div
            id="vertical-1"
            className="md:w-1/3 h-52 flex items-center justify-center"
          >
            {strain.nugImage && (
              <Image
                className="rounded"
                src={strain.nugImage}
                alt={strain?.slug}
                width={200}
                height={200}
              />
            )}
          </div>
          <div id="vertical-2" className="md:w-2/3 w-full">
            <div className="flex flex-row items-center gap-3 mb-2">
              <div className="bg-gray-200 dark:shadow rounded px-2 py-1 text-xs font-medium dark:bg-zinc-700 inline-block">
                {strain.phenotype}
              </div>
              <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4">
                <span className="">
                  THC {strain.thcPercent && strain.thcPercent}%
                </span>
                <span className="">
                  CBD:{" "}
                  {strain.cannabinoids && strain.cannabinoids.cbd.percentile50}%
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-0.5">{strain.name}</h1>
            <h2 className="font-semi text-zinc-400 md:w-2/3 min-h-10">
              {strain.subtitle}
            </h2>
            <span className="flex items-center justify-start gap-3 w-48 mt-1 text-zinc-800 dark:text-zinc-200">
              {strain.averageRating &&
                Math.round(strain.averageRating * 10) / 10}
              <StarRating rating={strain.averageRating || 0} />
            </span>
            <div className="flex flex-row mt-1 text-sm gap-3 font-medium capitalize">
              <span>O {strain.topEffect}</span>
              <span>O {strain.topTerpene}</span>
            </div>
          </div>
        </div>
        <div
          id="body"
          className="flex justify-center md:flex-row flex-col gap-8 px-5 md:px-8 w-full"
        >
          <div className="md:w-1/3 mt-3">
            <div className="flex flex-col border border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7 p-2 px-3 rounded gap-2">
              <h3 className="uppercase font-bold text-sm">Strain soma</h3>
              <p className="flex flex-row items-center gap-2 w-full text-xs">
                <FiThumbsUp size="12px" /> Feelings:
              </p>
              <p className="flex flex-row items-center gap-2 w-full text-xs">
                <FiThumbsDown size="12px" className="transform scale-x-[-1]" />{" "}
                Negatives:
              </p>

              <p className="flex flex-row items-center gap-2 w-full text-xs">
                <TbMedicalCross
                  size="12px"
                  className="transform scale-x-[-1]"
                />{" "}
                Helps with:
              </p>
            </div>
          </div>
          <div className="md:w-2/3">{strain.description}</div>
        </div>
      </div>
    </div>
  );
};

export default StrainPage;
