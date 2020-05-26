const fs = require("fs");
const pup = require("puppeteer");
const exec = require('child_process').exec;

var sanatizeTheme = (theme) => {
    theme.shift()
    theme.shift();
    theme = theme.join(" ")
    return theme;
}

const theme = sanatizeTheme(process.argv)

console.log(theme)

function genFolders() {
    var imgFolder = "./IMGS";
    var infoFolder = "./INFO";

    if (!fs.existsSync(imgFolder) || !fs.existsSync(infoFolder)) {
        fs.mkdirSync(imgFolder);
        fs.mkdirSync(infoFolder);
    } else {
        console.warn("ERROR[001]: one of the files already exists");
    }
};

async function searchImg(theme) {
    const browser = await pup.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?hl=pt-BR&tbm=isch&sxsrf=ALeKk02fbEGldLknD-Wj0cUIOZEZfvTyqQ%3A1590415812691&source=hp&biw=958&bih=937&ei=xNHLXrLMJ6G55OUPvYyxmAY&q=${theme}&oq=&gs_lcp=CgNpbWcQARgAMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnUABYAGDCEmgBcAB4AIABAIgBAJIBAJgBAKoBC2d3cy13aXotaW1nsAEK&sclient=img`);
    const getImg = await page.evaluate(() => {
        const imgs = [];
        links = document.getElementsByClassName("rg_i Q4LuWd")
        for (link of links) {
            imgs.push(link.src);
        }
        return imgs;
    });
    await browser.close();

    let imgs = getImg;

    async function downloadImg(imgs) {
        const browser = await pup.launch();
        const page = await browser.newPage();
        for (let i = 0; i != 6; i++) {
            if (imgs[i] != "") {
                await page.goto(`${imgs[i]}`);

                const element = await page.$('img');

                await element.screenshot({
                    path: `./IMGS/${i}.png`,
                    type: 'png'
                });
            };
        };
        await browser.close();
    }

    downloadImg(imgs);
}

function runFactorys() {
    genFolders();
    searchImg(theme);
}

runFactorys();