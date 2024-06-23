const fs = require("fs");

// Load the words from the JSON file
const rawData = fs.readFileSync("public/words.json", "utf-8");
const data = JSON.parse(rawData);

// Extract words
const words = Object.entries(data.words);

// Select three random words
const selectedWords = [];
while (selectedWords.length < 4) {
  const randomIndex = Math.floor(Math.random() * words.length);
  if (!selectedWords.includes(words[randomIndex])) {
    selectedWords.push(words[randomIndex]);
  }
}

// Create a new object with the selected words
const selectedData = {};
selectedWords.forEach(([word, details]) => {
  selectedData[word] = details;
});

// Write the selected words to a new JSON file
fs.writeFileSync(
  "public/daily.json",
  JSON.stringify({ daily_words: selectedData }, null, 4),
  "utf-8"
);

console.log("Successfully updated daily.json with new words.");
