/* eslint-disable @typescript-eslint/no-var-requires */

const strains = require("./leafbase.strains.json");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const batchSize = 150; // Adjust this number according to your database's capacity
const newStrains = strains.map((strain) => {
  delete strain._id;
  return strain;
});

async function insertStrains() {
  const numBatches = Math.ceil(newStrains.length / batchSize);

  for (let batchIndex = 0; batchIndex < numBatches; batchIndex++) {
    const batchStart = batchIndex * batchSize;
    const batchEnd = batchStart + batchSize;
    const strainsBatch = newStrains.slice(batchStart, batchEnd);

    const strainPromises = strainsBatch.map((strain) =>
      prisma.strain.create({ data: strain })
    );

    // Use prisma.$transaction() to insert strains in one go for each batch
    await prisma.$transaction(strainPromises);
    console.log(
      `Batch ${batchIndex + 1} of ${numBatches} inserted successfully!`
    );
  }

  console.log("All strains inserted successfully!");
}

insertStrains();
