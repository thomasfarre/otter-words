const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const response = await axios.get("https://fr.wiktionary.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        list: "random",
        rnnamespace: 0,
        rnlimit: 1,
      },
    });
    const title = response.data.query.random[0].title;

    const details = await axios.get("https://fr.wiktionary.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        prop: "extracts",
        titles: title,
      },
    });
    const page = details.data.query.pages;
    const pageId = Object.keys(page)[0];

    return {
      statusCode: 200,
      body: JSON.stringify({ word: title, definition: page[pageId].extract }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
