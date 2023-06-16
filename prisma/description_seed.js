const puppeteer = require("puppeteer");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function processPage(slug) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.leafly.com/strains/${slug}`);
    try {
      var button = await page.waitForXPath(
        '//*[@id="__next"]/div[13]/div/div/div[1]/div[4]/div[2]/div[2]/button',
        { timeout: 1000 }
      );
      await button.click();
      await page.screenshot({ path: `./scrapingbee_homepage.jpg` });
    } catch (err) {}

    var element = await page.waitForXPath(
      '//*[@id="__next"]/div[15]/main/div[1]/div[2]/section[1]/section/div[2]/div/div/div/p',
      { timeout: 2000 }
    );

    var text = await page.evaluate((element) => element.textContent, element);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    await browser.close();
  }
  return text;
}

async function getAllStrains() {
  const strains = await prisma.strain.findMany({});
  return strains;
}

async function updateStrain(strain, description) {
  const updatedStrain = await prisma.strain.update({
    where: {
      id: strain.id,
    },
    data: {
      description: description,
    },
  });
  return updatedStrain;
}

async function processAndUpdateStrain(strain) {
  console.log("====================================");
  console.log(`Processing ${strain.slug}`);
  const text = await processPage(strain.slug);
  if (!text) {
    console.log("no text found");
    console.log("====================================");
    return;
  }
  const updatedStrain = await updateStrain(strain, text);
  console.log("succesfully updated strain", updatedStrain.slug);
  console.log("====================================");
}

const dedupeStrains = async () => {
  const allStrains = await prisma.strain.findMany();
  const seenSlugs = new Set();

  console.log(`Deduping ${allStrains.length} strains`);

  for (const strain of allStrains) {
    if (seenSlugs.has(strain.slug)) {
      // If the slug is already in the Set, remove the strain
      console.log(`Deleting strain with id: ${strain.id}`)
      await prisma.strain.delete({ where: { id: strain.id } });
    } else {
      // Else, add the slug to the Set
      seenSlugs.add(strain.slug);
    }
  }
  console.log(`Deduped ${allStrains.length - seenSlugs.size} strains`);
};

async function main() {
  const strains = await getAllStrains();
  await dedupeStrains();

  const strainsWithNoDescription = strains.filter(
    (strain) => strain.description === null
  );

  console.log(`Updating ${strainsWithNoDescription.length} strains`);

  // Process strains concurrently
  const concurrency = 8; // Adjust this value to control the number of concurrent tasks
  const chunks = [];
  for (let i = 0; i < strainsWithNoDescription.length; i += concurrency) {
    chunks.push(strainsWithNoDescription.slice(i, i + concurrency));
  }

  for (const chunk of chunks) {
    await Promise.all(chunk.map((strain) => processAndUpdateStrain(strain)));
  }
}

main();
