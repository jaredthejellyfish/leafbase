import React from "react";
import Image from "next/image";

type Props = {};

const Strains = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-2xl font-semibold mb-5">
          Find the perfect strain for you.
        </h1>
        <Image
          src="https://img.freepik.com/free-vector/stylish-abstract-web-banner-with-text-space_1017-39039.jpg?w=2000"
          width={800}
          alt="Strains"
          height={2000}
        />
      </div>
    </div>
  );
};

export default Strains;
