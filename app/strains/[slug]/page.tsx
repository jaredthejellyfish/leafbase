import React from "react";
import prisma from "@/lib/prisma";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const strains = await prisma.strain.findMany({});

  return strains.map((strain) => ({
    slug: strain.slug,
  }))
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
  if (!strain) {
    return <div>Error not found</div>;
  }
  return <div>{strain?.description}</div>;
};

export default StrainPage;
