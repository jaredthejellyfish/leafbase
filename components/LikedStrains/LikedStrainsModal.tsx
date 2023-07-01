"use client";

import { StrainExtended } from "@/types/interfaces";
import React, { useEffect, useState } from "react";
import { BsClipboardDataFill } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { Scatter } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  Align,
} from "chart.js";

ChartJS.register(
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  ChartDataLabels,
  zoomPlugin
);

type Props = {
  strains: StrainExtended[];
};

interface LikedStrainPoint {
  name: string;
  x: number;
  y: number;
}

const fetchLikedStrainsData = async (strainNames: string[]) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LEAFBASE_API_URL}/liked-plot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        strains: strainNames,
      }),
    }
  );
  const data = await res.json();

  return data;
};

const generateDatasetsFromData = (data: LikedStrainPoint[]) => {
  const datasets = [];

  // Loop through each item in the data
  for (let i = 0; i < data.length; i++) {
    let point = data[i];

    // Create a new dataset for each item
    datasets.push({
      label: point.name,
      data: [{ x: point.x, y: point.y }],
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      pointRadius: 8,
    });
  }

  return { datasets: datasets };
};

const LikedStrainsModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       setIsModalOpen(false);
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  const strainNames = props.strains.map((strain) => strain.name);
  const currentTheme = useSelector((state: RootState) => state.theme);

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 30,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
      datalabels: {
        formatter: function (value: any, context: any) {
          return context.dataset.label;
        },
        display: true,
        color: currentTheme.theme === "dark" ? "white" : "black",
        align: "right" as Align,
        offset: 10,
      },
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  const {
    data: likedStrainsData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["liked-strains", strainNames],
    queryFn: () => fetchLikedStrainsData(strainNames),
    enabled: isModalOpen,
  });

  return (
    <>
      <BsClipboardDataFill
        onClick={() => setIsModalOpen(!isModalOpen)}
        size={20}
        className="inline-block mr-12 cursor-pointer text-zinc-500 dark:text-zinc-400"
      />
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/60"
          >
            <div className="relative flex flex-col w-5/6 p-5 bg-white sm:p-10 h-4/6 xl:w-1/2 md:w-2/3 rounded-xl dark:bg-zinc-900">
              <div className="flex flex-row items-center justify-between mb-4 text-xl font-bold sm:px-4">
                <h1 className="">Liked Strain Similarity</h1>
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 transition-all rounded-full dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-600 focus:outline-none"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              {isLoading || isFetching ? (
                <div
                  role="status"
                  className="flex items-center justify-center w-full h-full"
                >
                  <svg
                    aria-hidden="true"
                    className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-700"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <Scatter
                  height={"100%"}
                  plugins={[ChartDataLabels, zoomPlugin]}
                  // @ts-ignore
                  options={options}
                  updateMode="default"
                  data={generateDatasetsFromData(likedStrainsData)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LikedStrainsModal;
