const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const prisma = new PrismaClient();

async function getStrains(page = 0, take = 60) {
  const skip = page * take;
  const res = await axios.get(
    "https://consumer-api.leafly.com/api/strain_playlists/v2?" +
      "&enableNewFilters=true" +
      `&skip=${skip}` +
      `&take=${take}` +
      "&sort[0][recommended]=asc"
  );

  return res.data.hits.strain;
}

async function getInitialMetadata() {
  const res = await axios.get(
    "https://consumer-api.leafly.com/api/strain_playlists/v2?&enableNewFilters=true&skip=0&take=1&sort[0][recommended]=asc"
  );

  return res.data.metadata;
}

async function main(take = 60) {
  const metadata = await getInitialMetadata();
  const totalCount = metadata.totalCount;

  const pages = Math.ceil(totalCount / take);

  for (let i = 0; i < pages; i++) {
    const page = i;
    console.log(`Page ${page} of ${pages}`);
    const strains = await getStrains(page, take);
    const data = strains.map((strain) => {
      return {
        slug: strain.slug || undefined,
        name: strain.name || undefined,
        subtitle: strain.subtitle || undefined,
        category: strain.category || undefined,
        phenotype: strain.phenotype || undefined,
        averageRating: strain.averageRating || undefined,
        shortDescription: strain.shortDescriptionPlain || undefined,
        nugImage: strain.nugImage || undefined,
        flowerImageSvg: strain.flowerImageSvg || undefined,
        topTerpene: strain.strainTopTerp || undefined,
        thcPercent: strain.thc || undefined,
        topEffect: strain.topEffect || undefined,
        cannabinoids: strain.cannabinoids || undefined,
        effects: strain.effects || undefined,
        terps: strain.terps || undefined,
      };
    });
    try {
      const createdCount = await prisma.strain.createMany({
        data: data,
      });
      if (createdCount?.count) {
        console.log("Created strains:", createdCount.count);
      }
    } catch (e) {
      for (let strain in data) {
        try {
          const createdStrain = await prisma.strain.create({
            data: strain,
          });
          if (createdStrain) {
            console.log("Created strain:", createdStrain);
          }
        } catch (e) {
          console.log("failed to add strain", strain?.name);
        }
      }
    }
  }
}

main();
