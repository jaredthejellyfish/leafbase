const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function getFirstStrain() {
  const strain = await prisma.strain.findFirst();
  return strain;
}

async function getFirstUser() {
  const user = await prisma.user.findFirst();
  return user;
}

async function generateReviews(userId, strainId) {
  const reviews = [];
  for (let i = 0; i < 10; i++) {
    const review = await prisma.review.create({
      data: {
        userId: userId,
        strainId: strainId,
        rating: faker.datatype.number({ min: 1, max: 5 }),
        title: faker.lorem.words(3),
        body: faker.lorem.paragraph(),
      },
    });

    reviews.push(review);
  }
  return reviews;
}

async function main() {
  const strain = await getFirstStrain();
  const user = await getFirstUser();
  const reviews = await generateReviews(user.id, strain.id);
  console.log(reviews);
}

main();
