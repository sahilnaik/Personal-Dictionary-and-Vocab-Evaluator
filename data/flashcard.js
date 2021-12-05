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

  
async function updateSession(userId, sessionId, words, correctCount) {
  if (arguments.length != 4) throw "Invalid argument";
  if (!userId) throw "You must provide a userId to create a flashcard";
  if (typeof userId !== "string") throw "userId must be a string";
  userId = userId.trim();
  if (!ObjectId.isValid(userId)) throw "userId is not valid";
  userId = ObjectId(userId);
  if (!sessionId) throw "You must provide a sessionId to create a flashcard";
  if (typeof sessionId !== "string") throw "sessionId must be a string";
  sessionId = sessionId.trim();
  if (!words) throw "You must provide words to create a flashcard";
  let sessionNo = parseInt(sessionId);
  let correctCountNo = parseInt(correctCount);
  let correctArray = [];
  let incorrectArray = [];
  for(let i=0;i<words.length;i++){
    if(words[i].userSelection=="true"){
      words[i].userSelection=true;
      correctArray.push(words[i].word);
    }
    else{
      words[i].userSelection=false;
      incorrectArray.push(words[i].word);
    }
  }
 
  
  date = new Date();
  let time = date.toUTCString()
  const flashcardCollection = await flashcard();
  const updatedInfo = await flashcardCollection.updateOne(
    { userId: userId, "sessions._id": sessionNo },
    { $set: { "sessions.$.words": words, "sessions.$.correctCount": correctCountNo, "sessions.$.time": time, "sessions.$.correct": correctArray, "sessions.$.incorrect": incorrectArray } }
  );
  if (updatedInfo.modifiedCount === 0) throw "Could not update flashcard";
    calculate(userId);
}

async function calculate(userId) {
  let total = 0;
  
  const flashcardCollection = await flashcard();
 
  const sessionData = await flashcardCollection
    .find({ userId: userId }, { projection: { sessions: 1, _id: 0 } })
    .toArray();
    let haha = sessionData[0].sessions;
  let len= sessionData[0].sessions.length;

  for (let i = 0; i < len; i++) {
    total += sessionData[0].sessions[i].correctCount;
    
  }
  if (len == 0) {
    const updatedInfo = await flashcardCollection.updateOne(
      { userId: userId },
      { $set: { overallPercentage: 0 } }
    );
  } else {
    let overallPercentage = (total / (10*len))*100;
    overallPercentage = Math.round((overallPercentage + Number.EPSILON) * 100) / 100;

    const updatedInfo = await flashcardCollection.updateOne(
      { userId: userId },
      { $set: { overallPercentage: overallPercentage } }
    );
  }

}

async function getLastFiveSessions(id) {
  if (!id) throw "You must provide an email to get last five sessions";
  if (!ObjectId.isValid(id)) throw "userId is not valid";
  id = ObjectId(id);
  const flashcardCollection = await flashcard();

  const sessionData = await flashcardCollection.findOne({ userId: id });
  let session = sessionData.sessions;
  if (session.length == 0) {
    return 0;
  }
  let sessionLength = session.length;
  let len = sessionLength;
  let allSessions = [];
  let correctWords = [];
  let incorrectWords = [];
  let customSession ={};
  

    for (let i = 0; i<sessionLength ; i++) {
      customSession["id"] = session[i]._id;
      customSession["marks"]= session[i].correctCount;
      customSession["total"]= session[i].words.length;
      customSession["percentage"]= (session[i].correctCount)*10;
        for(j=0;j<session[i].words.length;j++){
          if(session[i].words[j].userSelection==true){
             correctWords.push(session[i].words[j].word);
            
          }
          else{
             incorrectWords.push(session[i].words[j].word);
            
          }
          
        }
        if(correctWords.length==0){
          customSession["correct"]="No correct words";
        }else{
          customSession["correct"]=correctWords.join(", ");
        }
        if(incorrectWords.length==0){
          customSession["incorrect"]="No incorrect words";
        }
        else{
          customSession["incorrect"]=incorrectWords.join(", ");
        }
        
          if(session[i].time){
          customSession["time"]=session[i].time;
          }
          else{
            customSession["time"]="Not submitted";
          }
      allSessions.push(customSession);
      customSession={};
      correctWords=[];
      incorrectWords=[];
    }
  allSessions = allSessions.reverse();
  return allSessions;
}

async function getPercentage(email) {
  if (!email) throw "You must provide an email to get percentage";
  if (typeof email !== "string") throw "email must be a string";
  email= email.trim();
  email = email.toLowerCase();
  const userCollection = await user();
  const userInfo = await userCollection.findOne({ email: email });
  if (!userInfo) throw "No user with that email";
  let userId = userInfo._id;
  const flashcardCollection = await flashcard();
  const percentage = await flashcardCollection.findOne({ userId: userId });
  let session = percentage.sessions;
  if (session.length == 0) {
    return 0;
  }
  return percentage.overallPercentage;
}

async function getLastFiveSessionScore(id){
  if (!id) throw "You must provide an email to get last five sessions";
  if (!ObjectId.isValid(id)) throw "userId is not valid";
  id = ObjectId(id);
  const flashcardCollection = await flashcard();

  const sessionData = await flashcardCollection.findOne({ userId: id });
  let session = sessionData.sessions;
  if (session.length == 0) {
    return 0;
  }
  let sessionLength = session.length;
  let len = sessionLength-1;
  let customSession =[];
  let customSessionId=[];
  let limit = 5;
  let i=0;
  let overallStuff ={};
  for(i=0;i<limit;i++){
    customSession.push(session[len].correctCount);
    customSessionId.push(session[len]._id);
    len--;
    if(len<0){
      break;
    }
  }
  overallStuff["scores"]=customSession;
  overallStuff["sessionId"]=customSessionId;
  return overallStuff;

}
  module.exports = {
    create,
    updateSession,
    getLastFiveSessions,
    getLastFiveSessionScore,
    getPercentage
  };