const mongoCollections = require("../config/mongoCollections");
const mcq = mongoCollections.mcq;
const user = mongoCollections.users;
const words = mongoCollections.words;
let { ObjectId } = require("mongodb");

async function create(userId) {
  if (arguments.length != 1) throw "Invalid argument";
  if (!userId) throw "You must provide a userId to create a mcq";
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
  const mcqCollection = await mcq();
  const checkDuplicate = await mcqCollection.findOne({ userId: userId });
  if (checkDuplicate) {
    
    let sessionOutput= createSession(userId, checkDuplicate.sessions.length);
    return sessionOutput;
  } else {
    let newMCQ = {
      userId,
      sessions,
      overallPercentage
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
  const wordCollection = await words();
  const findWords = await wordCollection
    .find({ userId: userId }, { projection: { words: 1 } })
    .toArray();
  let noOfWords = findWords[0].words.length - 1;

  for (let iterations = 0; iterations < 10; iterations++) {
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
  if (updatedInfo.modifiedCount === 0) throw "Could not add session";
  
  return sessionObject;
}

async function updateSession(userId, sessionId, words, correctCount) {
  if (arguments.length != 4) throw "Invalid argument";
  if (!userId) throw "You must provide a userId to create a mcq";
  if (typeof userId !== "string") throw "userId must be a string";
  userId = userId.trim();
  if (!ObjectId.isValid(userId)) throw "userId is not valid";
  if (!sessionId) throw "You must provide a sessionId to create a mcq";
  if (typeof sessionId !== "string") throw "sessionId must be a string";
  sessionId = sessionId.trim();
  if (!words) throw "You must provide words to create a mcq";
  let sessionNo = parseInt(sessionId);
  let correctCountNo = parseInt(correctCount);
  for(let i=0;i<words.length;i++){
    if(words[i].correctOrNot=="true"){
      words[i].correctOrNot=true;
    }
    else{
      words[i].correctOrNot=false;
    }
  }
 
  
  
  const mcqCollection = await mcq();
  const updatedInfo = await mcqCollection.updateOne(
    { userId: userId, "sessions._id": sessionNo },
    { $set: { "sessions.$.words": words, "sessions.$.correctCount": correctCountNo } }
  );
  if (updatedInfo.modifiedCount === 0) throw "Could not update mcq";
    calculateReview(userId);
}

async function calculateReview(userId) {
  let total = 0;
  
  const mcqCollection = await mcq();
 
  const sessionData = await mcqCollection
    .find({ userId: userId }, { projection: { sessions: 1, _id: 0 } })
    .toArray();
    let haha = sessionData[0].sessions;
  let len= sessionData[0].sessions.length;

  for (let i = 0; i < len; i++) {
    total += sessionData[0].sessions[i].correctCount;
    
  }
  if (len == 0) {
    const updatedInfo = await mcqCollection.updateOne(
      { userId: userId },
      { $set: { overallPercentage: 0 } }
    );
  } else {
    let overallPercentage = (total / (10*len))*100;
    overallPercentage = Math.round((overallPercentage + Number.EPSILON) * 100) / 100;

    const updatedInfo = await mcqCollection.updateOne(
      { userId: userId },
      { $set: { overallPercentage: overallPercentage } }
    );
  }

}

async function getPercentage(email) {
  if (!email) throw "You must provide an email to get percentage";
  if (typeof email !== "string") throw "email must be a string";
  email= email.trim();
  email = email.toLowerCase();
  const userCollection = await user();
  const userInfo = await userCollection.findOne({ email: email });
  if (!userInfo) throw "No user with that email";
  let userId = userInfo._id.toString();
  const mcqCollection = await mcq();
  const percentage = await mcqCollection.findOne({ userId: userId });
  let session = percentage.sessions;
  if (session.length == 0) {
    return 0;
  }
  return percentage.overallPercentage;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


module.exports = {
  create,
  updateSession,
  getPercentage,
};