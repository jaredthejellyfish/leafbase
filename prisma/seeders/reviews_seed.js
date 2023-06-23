const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function getStrains(skip = 0, take = 90) {
  const strains = await prisma.strain.findMany({
    skip: skip,
    take: take,
  });
  return strains;
}

async function getFirstUser() {
  const user = await prisma.user.findFirst();
  return user;
}

async function generateReviews(userId, strainId) {
  const reviews = [];
  for (let i = 0; i < Math.floor(Math.random() * (40 - 1 + 1)) + 1; i++) {
    const review = await prisma.review.create({
      data: {
        userId: userId,
        strainId: strainId,
        rating: faker.number.int({ min: 1, max: 5 }),
        body: faker.lorem.paragraph(),
      },
    });

    reviews.push(review);
  }
  return reviews;
}

async function main() {
  console.log("Seeding reviews...");

  const strains = await getStrains();
  if (!strains || strains.length < 1) throw new Error("No strains found");

  const user = await getFirstUser();
  if (!user) throw new Error("No user found");

  console.log(
    `Collected ${strains.length} strains. Seeding reviews with user: ${user.name}`
  );

  for (const strain of strains.slice(0, 90)) {
    const reviews = await generateReviews(user.id, strain.id);
    if (!reviews) throw new Error("No reviews could be generated");
    console.log(
      `Generated ${reviews.length} reviews for strain: ${strain.name}`
    );
  }

  console.log("Seeding reviews complete!");
}

main();
