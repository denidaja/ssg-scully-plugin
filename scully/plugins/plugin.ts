const { registerPlugin } = require('@scullyio/scully');
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

export const customPlugin = Symbol('customPlugin');

const customPluginFunction = async (html, route): Promise<string> => {
  const $ = cheerio.load(html);

  const imageList = getImageLinks($);
  await downloadFiles(imageList);

  return Promise.resolve($.html());
};

const getImageLinks = ($) => {
  let imageList = [];

  try {
    $('img').each(function (i, img) {
      // scrape src attribute
      const url = img.attribs.src;
      imageList = [...imageList, url];

      // replace src to local image
      $(this).attr('src', `./assets/${tokenize(url)}`);
    });

    return imageList;
  } catch (error) {
    console.error(error);
  }
};

const downloadFiles = async (imageList) => {
  for (const link of imageList) {
    // create write stream in assets dir
    let file = fs.createWriteStream(`dist/static/assets/${tokenize(link)}`);

    // download image locally
    const response = await axios({
      url: link,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(file);

    return new Promise((resolve, reject) => {
      file.on('finish', resolve);
      file.on('error', reject);
    });
  }
};

const tokenize = (link) => link.substring(link.lastIndexOf('/') + 1);

registerPlugin('postProcessByHtml', customPlugin, customPluginFunction);
