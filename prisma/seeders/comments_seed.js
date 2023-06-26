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
  const user = await prisma.user.findUnique(
    {
      where: {
        email: "ger.almenara@gmail.com",
      },
    }
  );
  return user;
}

async function generateComments(userId, strainId) {
  const comments = [];
  for (let i = 0; i < Math.floor(Math.random() * (40 - 1 + 1)) + 1; i++) {
    const comment = await prisma.comment.create({
      data: {
        userId: userId,
        strainId: strainId,
        body: faker.lorem.paragraph(),
      },
    });

    comments.push(comment);
  }
  return comments;
}

async function main() {
  console.log("Seeding comments...");

  const strains = await getStrains();
  if (!strains || strains.length < 1) throw new Error("No strains found");

  const user = await getFirstUser();
  if (!user) throw new Error("No user found");

  console.log(
    `Collected ${strains.length} strains. Seeding comments with user: ${user.name}`
  );

  for (const strain of strains.slice(0, 90)) {
    const comments = await generateComments(user.id, strain.id);
    if (!comments) throw new Error("No comments could be generated");
    console.log(
      `Generated ${comments.length} comments for strain: ${strain.name}`
    );
  }

  console.log("Seeding comments complete!");
}

main();
