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
      const content = pages[0].revisions[0].content;
      const definition = extractDefinition(content);
      return {
        statusCode: 200,
        body: JSON.stringify({ definition }),
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

// Function to extract a simple definition from the complex wiki markup
function extractDefinition(text) {
  // This is a basic regex and might need to be adjusted based on actual content patterns
  const match = text.match(/#\s*(.*)/);
  return match
    ? match[1]
        .replace(/{{.*?}}/g, "")
        .replace(/\[\[(.*?)\]\]/g, (match, p1) => {
          // This removes links and retains the label part of the link if any
          const parts = p1.split("|");
          return parts[parts.length - 1];
        })
        .trim()
    : "Definition not available";
}
