const strains = require("./leafbase.strains.json");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const newStrains = strains.map((strain) => {
  delete strain._id;
  return strain;
});

async function insertStrains() {
  const promises = [];

  for (const strain of newStrains) {
    promises.push(
      prisma.strain.create({ data: strain }) // create() returns a promise
    );
  }

  await Promise.all(promises);

  console.log("All strains inserted successfully!");
}

insertStrains();
