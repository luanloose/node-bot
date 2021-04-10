const puppeteer = require('puppeteer');

exports.link = async (termo) => {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/');

    const elementHandle = await page.$("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input");
    await elementHandle.type(termo);
    await elementHandle.press('Enter');

    const result = "#rso > div > div:nth-child(1) > div > div.yuRUbf > a";
    await page.waitForSelector(result);

    await page.$(result);

    const href = await page.$eval(result, (elm) => elm.href);

    await browser.close();

    return href;
}

exports.print = async (termo) => {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/');

    const elementHandle = await page.$("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input");
    await elementHandle.type(termo);
    await elementHandle.press('Enter');

    const result = "#rso > div > div:nth-child(1) > div > div.yuRUbf > a";
    await page.waitForSelector(result);

    const print = await page.screenshot();

    await browser.close();

    return print;
}

exports.youtube = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://youtube.com');

    await page.type('#search', 'Fleetwood Mac Dreams');

    await page.click('button#search-icon-legacy');

    await page.waitForSelector('ytd-thumbnail.ytd-video-renderer');

    await page.screenshot({ path: 'youtube_fm_dreams_list.png' });

    const videos = await page.$$('ytd-thumbnail.ytd-video-renderer');

    await videos[2].click();

    await page.waitForSelector('.html5-video-container');

    await page.screenshot({ path: 'example.png' });

    await browser.close();

    return "acabou";

}