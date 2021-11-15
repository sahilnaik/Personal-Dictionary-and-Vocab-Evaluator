const userData = require("./user");
const mcqData = require("./mcq");
//const wordData = require("./words");
const initialSeedData = require("./initialSeed");

module.exports = {
  user: userData,
  initialSeed: initialSeedData,
  mcq: mcqData,
  // word: wordData,
};
