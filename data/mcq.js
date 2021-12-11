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
  const checkDuplicate = await mcqCollection.findOne({ userId: Id });
  if (checkDuplicate) {
    
    let sessionOutput= createSession(Id, checkDuplicate.sessions.length);
    return sessionOutput;
  } else {
    let newMCQ = {
      userId: Id,
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
  if (arguments.length != 2) throw "Invalid argument";
  if (!userId) throw "You must provide a userId to create a mcq";
  if(typeof length!="number") throw "length must be a number";
  


  let count = length;
  let bool;
  let QnAarray = [];
  let prevQuestion = [];

  const wordCollection = await words();
  const findWords = await wordCollection
    .find({ userId: userId }, { projection: { words: 1 } })
    .toArray();
  let noOfWords = findWords[0].words.length - 1;

  for (let iterations = 0; iterations < 5; iterations++) {
    let randomNum = Math.round(Math.random() * noOfWords);
    
    let question_word = findWords[0].words[randomNum].word;
      

    
    let answer_word = findWords[0].words[randomNum].synonyms[0];
    if (!prevQuestion.includes(question_word) && findWords[0].words[randomNum].progress=="learnt") {
      let wrongOption;
      let ansOptions = [];
      let counter = 0;
      for (let i = 0; i < 4; i++) {
        let randomNumForOptions = Math.round(Math.random() * noOfWords);
        wrongOption = findWords[0].words[randomNumForOptions].synonyms[0];
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
  userId = ObjectId(userId);
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
 
  
  date = new Date();
  let time = date.toUTCString()
  const mcqCollection = await mcq();
  const updatedInfo = await mcqCollection.updateOne(
    { userId: userId, "sessions._id": sessionNo },
    { $set: { "sessions.$.words": words, "sessions.$.correctCount": correctCountNo, "sessions.$.time": time } }
  );
  if (updatedInfo.modifiedCount === 0) throw "Could not update mcq";
    calculate(userId);
}

async function calculate(userId) {
  if (arguments.length != 1) throw "Invalid argument";
  if (!userId) throw "You must provide a userId to update mcq";
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
  let userId = userInfo._id;
  const mcqCollection = await mcq();
  const percentage = await mcqCollection.findOne({ userId: userId });
  let session = percentage.sessions;
  if (session.length == 0) {
    return 0;
  }
  return percentage.overallPercentage;
}

async function getLastFiveSessions(id) {
  if (!id) throw "You must provide an email to get last five sessions";
  if (!ObjectId.isValid(id)) throw "userId is not valid";
  id = ObjectId(id);
  const mcqCollection = await mcq();

  const sessionData = await mcqCollection.findOne({ userId: id });
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
      customSession["percentage"]= (session[i].correctCount)/(session[i].words.length)*100;
        for(j=0;j<session[i].words.length;j++){
          if(session[i].words[j].correctOrNot==true){
             correctWords.push(session[i].words[j].question_word);
            
          }
          else{
             incorrectWords.push(session[i].words[j].question_word);
            
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
  


    allSessions= allSessions.reverse();
        //session3["marks"]="8";
        // session3["total"]="10";
        // session3["percentage"]="80%";
        // session3["correct"]="Rage,Sad";
        // session3["incorrect"]="Lame,Sheer";
  return allSessions;
}

async function getLastFiveSessionScore(id){
  if (!id) throw "You must provide an email to get last five sessions";
  if (!ObjectId.isValid(id)) throw "userId is not valid";
  id = ObjectId(id);
  const mcqCollection = await mcq();

  const sessionData = await mcqCollection.findOne({ userId: id });
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
  getLastFiveSessions,
  getLastFiveSessionScore
};