const mongoCollections = require("../config/mongoCollections");
const mcq = mongoCollections.mcq;
const user = mongoCollections.user;
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
  let QnA = {
    question_word: "Word",
    answer: ["Word1", "Word2", "Word3", "Word4"],
    correctOrNot: bool,
    correctAns: "Word",
    userSelected: "Word",
  };

  QnAarray.push(QnA);
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
module.exports = {
  create,
};
