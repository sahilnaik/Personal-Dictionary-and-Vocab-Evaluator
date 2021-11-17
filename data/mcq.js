const mongoCollections = require("../config/mongoCollections");
const mcq = mongoCollections.mcq;
const user = mongoCollections.user;
const word = mongoCollections.word;
let { ObjectId } = require("mongodb");

async function create(userId) {
  if (arguments.length != 1) throw "Invalid argument";
  if (!userId) throw "You must provide a userId to create a mcq";
  if (typeof userId !== "string") throw "userId must be a string";
  userId = userId.trim();
  if (!ObjectId.isValid(userId)) throw "userId is not valid";
  sessions = [];
  const userCollection = await user();
  let Id = ObjectId(userId);
  const inputId = await userCollection.findOne({ _id: Id });
  if (inputId == null) {
    throw `User with id ${userId} does not exist`;
  }
  const mcqCollection = await mcq();
  const checkDuplicate = await mcqCollection.findOne({ userId: userId });
  if (checkDuplicate) {
    createSession(userId, checkDuplicate.sessions.length);
  } else {
    let newMCQ = {
      userId,
      sessions,
    };

    const insertInfo = await mcqCollection.insertOne(newMCQ);
    const newId = insertInfo.insertedId;

    const updatedInfo = await userCollection.updateOne(
      { _id: Id },
      { $set: { mcqTestId: newId } }
    );
    if (insertInfo.insertedCount === 0) throw "Could not add user";
  }
}

async function createSession(userId, length) {
  let count = length;
  let bool;
  let QnAarray = [];
  let prevQuestion = [];
  const wordCollection = await word();
  const findWords = await wordCollection
    .find({ userId: userId }, { projection: { words: 1 } })
    .toArray();
  let noOfWords = findWords[0].words.length - 1;

  for (let iterations = 0; iterations < 9; iterations++) {
    let randomNum = Math.round(Math.random() * noOfWords);
    let question_word = findWords[0].words[randomNum].word;
    let answer_word = findWords[0].words[randomNum].synonyms[0];
    if (!prevQuestion.includes(question_word)) {
      let wrongOption;
      let ansOptions = [];
      let counter = 0;
      for (let i = 0; i < 4; i++) {
        let randomNumForOptions = Math.round(Math.random() * noOfWords);
        wrongOption = findWords[0].words[randomNumForOptions].antonyms[0];
        if (counter < 3) {
          if (
            randomNumForOptions != randomNum &&
            !ansOptions.includes(wrongOption)
          ) {
            ansOptions.push(wrongOption);
            counter++;
          } else {
            i--;
          }
        }
      }
      ansOptions.push(answer_word);
      shuffleArray(ansOptions);
      let QnA = {
        question_word: question_word,
        answer: ansOptions,
        correctOrNot: bool,
        correctAns: answer_word,
      };
      prevQuestion.push(question_word);
      QnAarray.push(QnA);
    } else {
      iterations--;
    }
  }
  let sessionObject = {
    _id: count + 1,
    words: QnAarray,
    correctCount: 0,
  };
  const mcqCollection = await mcq();
  const updatedInfo = await mcqCollection.updateOne(
    { userId: userId },
    { $push: { sessions: sessionObject } }
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
module.exports = {
  create,
};
