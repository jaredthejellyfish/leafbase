/* eslint-disable @typescript-eslint/no-var-requires */

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const generateMenus = async (dispensaries) => {
  const strainsFromDb = await prisma.strain.findMany({
    take: 800,
  });
  const menus = [];
  for (const dispensary of dispensaries) {
    {
      const selectedStrains = strainsFromDb
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      const strains = selectedStrains.map((strain) => {
        return {
          id: strain.id,
        };
      });

      const prices = strains.map((strain) => {
        return {
          strainId: strain.id,
          price: faker.finance.amount(5, 50, 2),
        };
      });

      const menu = {
        strains: { connect: strains },
        prices: prices,
        dispensaryId: dispensary.id,
      };

      menus.push(menu);
    }
  }
  return menus;
};

const generateDispensaries = async (quantity) => {
  const dispensaries = [];
  for (let i = 0; i < quantity; i++) {
    const name = faker.company.name();

    const dispensary = {
      slug: faker.helpers.slugify(name).toLowerCase().replace('---', '-'),
      name: name,
      description: faker.lorem.paragraphs(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      phone: Math.random() < 0.5 ? null : faker.phone.number('+34#########'),
      website: null,
      email: Math.random() < 0.5 ? null : faker.internet.email(),
      hours: `${faker.number.int({ min: 9, max: 13 })} - ${faker.number.int({
        min: 15,
        max: 24,
      })}`,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      averageRating: faker.number.float({ min: 1, max: 5, precision: 1 }),
      image: null,
      logo: faker.image.avatar(),
    };

    dispensaries.push(dispensary);
  }

  return dispensaries;
};

const generateComments = async (dispensaries) => {
  const comments = [];
  const user = await prisma.user.findMany({
    take: 1,
  });

  for (const dispensary of dispensaries) {
    for (let i = 0; i < Math.floor(Math.random() * (40 - 1 + 1)) + 1; i++) {
      const comment = {
        body: faker.lorem.sentence(),
        dispensary: {
          connect: {
            id: dispensary.id,
          },
        },
        user: {
          connect: {
            id: user[0].id,
          },
        },
      };

      comments.push(comment);
    }
  }
  return comments;
};

const addDispensaries = async (dispensaries) => {
  const addedDispensaries = [];

  for (const dispensary of dispensaries) {
    const dispo = await prisma.dispensary.create({
      data: dispensary,
    });

    addedDispensaries.push(dispo);
  }

  return addedDispensaries;
};

const addMneus = async (menus) => {
  const addedMenus = [];

  for (const menu of menus) {
    const addedMenu = await prisma.dispensaryMenu.create({
      data: {
        dispensaryId: menu.dispensaryId,
        prices: menu.prices,
        strains: menu.strains,
      },
    });

    addedMenus.push(addedMenu);
  }

  return addedMenus;
};

const addComments = async (comments) => {
  const addedComments = [];

  for (const comment of comments) {
    const addedComment = await prisma.dispensaryComment.create({
      data: comment,
    });

    addedComments.push(addedComment);
  }

  return addedComments;
};

const main = async () => {
  console.log('Seeding dispensaries...');

  const dispensaries = await generateDispensaries(10);
  const addedDispensaries = await addDispensaries(dispensaries);
  if (addedDispensaries) console.log('Dispensaries seeded successfully!');

  const menus = await generateMenus(addedDispensaries);
  const addedMenus = await addMneus(menus);
  if (addedMenus) console.log('Menus generated successfully!');

  const comments = await generateComments(addedDispensaries);
  const addedComments = await addComments(comments);
  if (addedComments) console.log('Comments generated successfully!');

  process.exit(0);
};

main();
