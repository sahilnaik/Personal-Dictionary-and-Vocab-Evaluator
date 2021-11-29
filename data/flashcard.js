const mongoCollections = require("../config/mongoCollections");
const flashcard = mongoCollections.flashcard;
const user = mongoCollections.users;
const words = mongoCollections.words;
let { ObjectId } = require("mongodb");

async function create(userId) {
    if (arguments.length != 1) throw "Invalid argument";
    if (!userId) throw "You must provide a userId to create a flashcard";
    if (typeof userId !== "string") throw "userId must be a string";
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw "userId is not valid";
    let sessions = [];
    let overallPercentage = 0;
    const userCollection = await user();
    let Id = ObjectId(userId);
    const inputId = await userCollection.findOne({ _id: Id });
    if (inputId == null) {
      throw `User with id ${userId} does not exist`;
    }
    const flashcardCollection = await flashcard();
    const checkDuplicate = await flashcardCollection.findOne({ userId: Id });
    if (checkDuplicate) {
      
      let sessionOutput= createSession(Id, checkDuplicate.sessions.length);
      return sessionOutput;
    } else {
      let newFlashcard = {
        userId: Id,
        sessions,
        overallPercentage
      };
  
      const insertInfo = await flashcardCollection.insertOne(newFlashcard);
      const newId = insertInfo.insertedId;
  
      const updatedInfo = await userCollection.updateOne(
        { _id: Id },
        { $set: { flashcardId: newId } }
      );
      if (insertInfo.insertedCount === 0) throw "Could not add user";
    }
    
}

async function createSession(userId, length) {
    let count = length;
    let wordArray = [];
    let prevQuestion = [];
    const wordCollection = await words();
    const findWords = await wordCollection
      .find({ userId: userId }, { projection: { words: 1 } })
      .toArray();
    let noOfWords = findWords[0].words.length - 1;
  
    for (let iterations = 0; iterations < 10; iterations++) {
      let randomNum = Math.round(Math.random() * noOfWords);
      let question_word = findWords[0].words[randomNum].word;
      
      if (!prevQuestion.includes(question_word)) {
        let meaning = findWords[0].words[randomNum].meaning;
        let synonyms = findWords[0].words[randomNum].synonyms;
        let antonyms = findWords[0].words[randomNum].antonyms;
        let examples = findWords[0].words[randomNum].examples;
        let wordInfo = {
          question_word: question_word,
          meaning: meaning,
          synonyms: synonyms,
          antonyms: antonyms,
            examples: examples,
            correctOrNot: false,
        };
        prevQuestion.push(question_word);
        wordArray.push(wordInfo);
      } else {
        iterations--;
      }
    }
    let sessionObject = {
      _id: count + 1,
      words: wordArray,
      correctCount: 0,
      correct: "",
        incorrect: "",
    };
    const flashcardCollection = await flashcard();
    const updatedInfo = await flashcardCollection.updateOne(
      { userId: userId },
      { $push: { sessions: sessionObject } }
    );
    if (updatedInfo.modifiedCount === 0) throw "Could not add session";
    
    return sessionObject;
  }
  
  module.exports = {
    create,
  };