const axios = require("axios");

exports.handler = async function (event, context) {
  const word = event.queryStringParameters.word;

  if (!word) {
    return {
      statusCode: 400,
      body: "No word provided",
    };
  }

  const url = `https://fr.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(
    word
  )}&prop=revisions&rvprop=content&format=json&formatversion=2`;

  try {
    const response = await axios.get(url);
    const pages = response.data.query.pages;
    if (pages.length > 0 && pages[0].revisions) {
      return {
        statusCode: 200,
        body: JSON.stringify({ definition: pages[0].revisions[0].content }),
      };
    }
    return {
      statusCode: 404,
      body: "No definition found",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch definition" }),
    };
  }
};
