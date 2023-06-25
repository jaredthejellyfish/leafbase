import React from "react";
import { RxCaretDown } from "react-icons/rx";
import useServerStrains from "@/hooks/useServerStrains";
import StrainCard from "@/components/StrainCard/StrainCard";
import StrainLoader from "@/components/StrainLoader/StrainLoader";

type Props = {};

export const metadata = {
  title: "Strains - Budly",
};

const Strains = async (props: Props) => {
  const { strains, count, error } = await useServerStrains(1, 12);
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 xl:px-52">
      <div className="max-w-4xl">
        <h1 className="mt-4 mb-2 text-3xl font-bold ">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of reviews.
        </p>
        <div className="flex items-center justify-between px-1 font-medium">
          <span className="mt-4 text-xs text-zinc-400">{count} strains</span>
          <span className="flex flex-row items-center gap-1 mt-4 text-xs text-zinc-400">
            Sort by
            <span className="flex flex-row items-center cursor-pointer dark:text-zinc-300 text-zinc-500">
              Recommended <RxCaretDown size={14} />
            </span>
          </span>
        </div>
        <span className="hidden w-full p-2 mt-1 text-xs border rounded md:block border-zinc-600/50 text-zinc-600">
          These results are based on user reviews and are not a substitute for
          professional medical advice.
        </span>
        <div className="flex items-center justify-center w-full">
          <div className="relative grid max-w-4xl md:grid-cols-3 gap-x-4">
            {strains &&
              strains.map((strain) => (
                <StrainCard
                  key={strain.slug}
                  id={strain.id}
                  slug={strain.slug}
                  name={strain.name || "Unknown"}
                  subtitle={strain.subtitle || "Unknown"}
                  category={strain.category || "Unknown"}
                  phenotype={strain.phenotype || "Unknown"}
                  averageRating={strain.averageRating || 0}
                  shortDescription={strain.shortDescription || "Unknown"}
                  nugImage={strain.nugImage || "Unknown"}
                  flowerImageSvg={strain.flowerImageSvg || "Unknown"}
                  topTerpene={strain.topTerpene || "Unknown"}
                  thcPercent={strain.thcPercent || 0}
                  topEffect={strain.topEffect || "Unknown"}
                  cannabinoids={strain.cannabinoids || "Unknown"}
                  effects={strain.effects || "Unknown"}
                  terps={strain.terps || "Unknown"}
                  liked={strain.likes.length > 0}
                  priority={true}
                />
              ))}
            <StrainLoader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strains;
