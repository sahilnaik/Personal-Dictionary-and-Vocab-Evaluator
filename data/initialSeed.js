const mongoCollections = require("../config/mongoCollections");
const initialSeed = mongoCollections.initialSeed;
let { ObjectId } = require("mongodb");

async function create(word, meaning, synonyms, antonyms, examples) {
  const initialSeedCollection = await initialSeed();

  let newWord = {
    word,
    meaning,
    synonyms,
    antonyms,
    examples,
  };

  const insertInfo = await initialSeedCollection.insertOne(newWord);
  if (insertInfo.insertedCount === 0) throw "Could not add word";

  const newId = insertInfo.insertedId.toString();
}

module.exports = {
  create,
};
