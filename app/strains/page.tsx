import React from "react";
import Image from "next/image";
import useServerStrains from "@/hooks/useServerStrains";
import { RxCaretDown } from "react-icons/rx";
import StrainCard from "@/components/StrainCard/StrainCard";
import StrainLoader from "./StrainLoader";

type Props = {};

const Strains = async (props: Props) => {
  const { strains, count, error } = await useServerStrains(1, 9);
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center px-6 md:px-20">
      <div className="xl:w-1/2">
        <h1 className=" font-bold text-3xl mb-2 mt-4">All strains</h1>
        <p className="">
          Welcome to our friendly online library of weed strains! Easily
          navigate through our vast selection by type, effects, or user reviews.
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
        <div className="grid md:grid-cols-3 gap-x-4">
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
                liked={true}
              />
            ))}
          <StrainLoader />
        </div>
      </div>
    </div>
  );
};

export default Strains;
