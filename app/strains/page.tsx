import React from "react";
import { RxCaretDown } from "react-icons/rx";
import useServerStrains from "@/hooks/useServerStrains";
import StrainCard from "@/components/StrainCard/StrainCard";
import StrainLoader from "@/components/StrainLoader/StrainLoader";

type Props = {};

const Strains = async (props: Props) => {
  const { strains, count, error } = await useServerStrains(1, 9);
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center px-6 xl:px-52">
      <div className="max-w-4xl">
        <h1 className=" font-bold text-3xl mb-2 mt-4">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of reviews.
        </p>
        <div className="flex px-1 items-center font-medium justify-between">
          <span className="text-xs mt-4 text-zinc-400">{count} strains</span>
          <span className="flex flex-row items-center gap-1 text-xs mt-4 text-zinc-400">
            Sort by
            <span className="dark:text-zinc-300 text-zinc-500 flex flex-row items-center cursor-pointer">
              Recommended <RxCaretDown size={14} />
            </span>
          </span>
        </div>
        <span className="w-full hidden md:block mt-1 p-2 border border-zinc-600/50 rounded text-xs text-zinc-600">
          These results are based on user reviews and are not a substitute for
          professional medical advice.
        </span>
        <div className="flex items-center justify-center w-full">
          <div className="grid md:grid-cols-3 gap-x-4 max-w-4xl">
            {strains &&
              strains.map((strain) => (
                <StrainCard
                  key={strain.slug}
                  id={strain.id}
                  slug={strain.slug}
                  name={strain.name || undefined}
                  subtitle={strain.subtitle || undefined}
                  category={strain.category || undefined}
                  phenotype={strain.phenotype || undefined}
                  averageRating={strain.averageRating || undefined}
                  shortDescription={strain.shortDescription || undefined}
                  nugImage={strain.nugImage || undefined}
                  flowerImageSvg={strain.flowerImageSvg || undefined}
                  topTerpene={strain.topTerpene || undefined}
                  thcPercent={strain.thcPercent || undefined}
                  topEffect={strain.topEffect || undefined}
                  cannabinoids={strain.cannabinoids || undefined}
                  effects={strain.effects || undefined}
                  terps={strain.terps || undefined}
                  liked={strain.Like.length > 0}
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
