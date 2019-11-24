const puppeteer = require("puppeteer");
const Badge = require("../models/Badge");
const cron = require("node-cron");
const cheerio = require("cheerio");

async function scrapeBadges() {
  cron.schedule("* 59 23 *", async () => {
    await startScraper();
  });
}

async function startScraper() {
  const site = await getHTML();
  const badges = await filterBadges(site);
  saveBadges(badges);

  return 'Contenido clonado satisfactoriamente'
}

async function getHTML() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://coinmarketcal.com/es/", {
    waitUntil: "domcontentloaded"
  });
  const pageContent = await page.content();
  await browser.close();
  return pageContent;
}

async function filterBadges(site) {
  const $ = cheerio.load(site);
  let badges = [];

  $("article").each((index, el) => {
    badges.push({
      companies: trimContent(
        $(el)
          .find("h5 > a")
          .text()
      ),
      votes: $(el)
        .find(".progress-bar")
        .attr("aria-valuenow"),
      title: trimContent(
        $(el)
          .find("a.link-detail > .card__title")
          .text()
      ),
      date: getISODate(
        $(el)
          .find("a.link-detail > .card__date")
          .text()
      ),
      description: trimContent(
        $(el)
          .find(".card__description")
          .text()
      ),
      source: $(el)
        .find(".rounded-pill")
        .last()
        .attr("href")
    });
  });

  return badges;
}

function getISODate(stringDate) {
  return new Date(trimContent(stringDate)).toISOString();
}

async function saveBadges(badges) {
  truncateModel();
  await Badge.bulkCreate(badges);
}

function trimContent(content) {
  return content.trim();
}

async function truncateModel() {
  await Badge.destroy({truncate: true});

  return ;
}

module.exports = {
  scrapeBadges
};
