const puppeteer = require('puppeteer');
const { logInfo } = require('./logger');

// if there are iPhones available, they are returned in an array
// if not, an empty array is returned
// see below array structure, declaration @ line #13
const crawl = async () => {
  const URL = process.env.URL;
  logInfo("Accessing page " + URL);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(URL);
  await page.waitForSelector("#js-product-list");
  const items = await page.$$eval(".product-description", productDescriptions =>
    productDescriptions.map(pd => ({
      title: pd.querySelector(".product-title > a").textContent,
      link: pd.querySelector(".product-title > a").getAttribute("href"),
      price: pd.querySelector(".price").textContent,
    }))
  );
  await page.screenshot({ path: 'debug.png' });
  await browser.close();
  return items;
};

exports.crawl = crawl;