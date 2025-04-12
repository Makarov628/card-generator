const axios = require('axios');
const cheerio = require('cheerio');

async function getIconsUrl(query) {
  const searchUrl = `https://www.flaticon.com/search?word=${query}`;

  const { data: html } = await axios.get(searchUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "Cache-Control": "max-age=0",
      "Priority": "u=0, i",
      "Sec-Ch-Ua": 'Not A(Brand";v="8", "Chromium";v="132", "Opera GX";v="117"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1"
    }
  });

  const $ = cheerio.load(html);
  const iconsUrls = [];

  $('img').each((_, element) => {
    const iconUrl = $(element).attr('src')
    if (iconUrl.startsWith('https://cdn-icons-png.flaticon.com/'))
      iconsUrls.push(iconUrl);
  });

  return iconsUrls;
}


module.exports = {
  getIconsUrl
};