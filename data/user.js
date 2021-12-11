const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.users;
const bcrypt = require("bcryptjs");
let { ObjectId } = require("mongodb");
let saltRounds = 16;
const mcqStuff = require("./mcq");
const flashcardStuff = require("./flashcard");
const createFlashcard = flashcardStuff.create;
const createMcq = mcqStuff.create;
const { createWordsDocument } = require("./words")

function stringErrorHandler(pass) {
  if (typeof pass !== "string") throw "Type must be a string";
  if (pass.trim() === "") throw "Input cannot be empty";
}
async function create(firstName, lastName, email, phoneNumber, password) {
  if (arguments.length !== 5) {
    throw "Check arguments passed";
  }
  stringErrorHandler(firstName);
  stringErrorHandler(lastName);
  stringErrorHandler(email);
  stringErrorHandler(phoneNumber);
  if (
    phoneNumber.at(3) !== "-" ||
    phoneNumber.at(7) !== "-" ||
    phoneNumber.length != 12
  ) {
    throw "Phone number invalid";
  }
  if (
    firstName.length < 1 ||
    lastName.length < 1 ||
    email.length < 1 ||
    password.length < 8
  ) {
    throw "Bad input";
  }
  email = email.toLowerCase();
  const checkForLetters = (phoneNumber) =>
    [...phoneNumber].every((c) => "0123456789-".includes(c));

  if (checkForLetters(phoneNumber) === false) {
    throw "Phone number invalid";
  }
  if (!validateEmail(email)) {
    throw "Invalid email";
  }

  let wordsId = 0;
  let flashcardId = 0;
  let overallLearnt = 0;
  let mcqTestId = 0;
  let profilePicture = "default.jpeg";
  const userCollection = await user();
  const checkEmail = await userCollection.findOne({
    email: email,
  });
  const checkPhone = await userCollection.findOne({
    phoneNumber: phoneNumber,
  });
  if (checkPhone !== null) {
    if (checkPhone.phoneNumber === phoneNumber) {
      throw "Phone number provided already exists";
    }
  }
  if (checkEmail !== null) {
    if (checkEmail.email === email) {
      throw "Email provided is already registered";
    }
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let newUser = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password : hashedPassword,
    wordsId,
    flashcardId,
    overallLearnt,
    mcqTestId,
    profilePicture,
  };
  

  const insertInfo = await userCollection.insertOne(newUser);
  const newId = insertInfo.insertedId.toString();
  if (insertInfo.insertedCount === 0) throw "Could not add user";
  await createMcq(newId);
  await createFlashcard(newId);
  let wordDocumentId = await createWordsDocument(newId)
  let wordIdInserted = await userCollection.updateOne({_id: ObjectId(newId)}, {$set: {wordsId: wordDocumentId}})
  console.log(wordIdInserted);
}

async function get(email, password) {
  if (arguments.length !== 2) {
    throw "Check arguments passed";
  }
  stringErrorHandler(email);
  stringErrorHandler(password);
  let resObj = { authenticated: true };
  const userCollection = await user();
  
  const checkEmail = await userCollection.findOne({ email: email });
  if (checkEmail === null) {
    throw `Either the username or password is invalid`;
  }
  const passwordCorrect = await bcrypt.compare(password, checkEmail.password);
    if (!passwordCorrect) { 
      throw "Invalid email and password combination";
    } else {
      
      return checkEmail; 

    }
  
}

async function remove(id) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  errorHandle(id);
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }

  id = ObjectId(id);

  if (!id) throw "You must provide an id to search for";

  const userCollection = await user();
  const getName = await get(id.toString());

  const deletionInfo = await userCollection.deleteOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete user with id of ${id}`;
  }
  let returnObj = {};
  returnObj["userId"] = id.toString();
  returnObj["deleted"] = true;
  return returnObj;
}

async function update(id, firstName, lastName, email, phone, password) {
  if (arguments.length !== 6) {
    throw "Check arguments passed";
  }
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }
  id = ObjectId(id);
  const userCollection = await user();
  const inputId = await userCollection.find({ _id: id }).toArray();
  if (inputId.length === 0) {
    throw "No user with that id";
  }
  stringErrorHandler(firstName);
  stringErrorHandler(lastName);
  stringErrorHandler(email);
  stringErrorHandler(phone);
  if (
    phoneNumber.at(3) !== "-" ||
    phoneNumber.at(7) !== "-" ||
    phoneNumber.length != 12
  ) {
    throw "Phone number invalid";
  }
  const checkForLetters = (phoneNumber) =>
    [...phoneNumber].every((c) => "0123456789-".includes(c));

  if (checkForLetters(phoneNumber) === false) {
    throw "Phone number invalid";
  }

  const updateUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password,
  };

  const updatedInfo = await userCollection.updateOne(
    { _id: id },
    { $set: updateUser }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update user successfully";
  }
  return await this.get(id.toString());
}

async function updatePicture(id, profilePicture) {
  if (arguments.length !== 2) {
    throw "Check arguments passed";
  }
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }
  if(profilePicture.length === 0) {
    throw "No profile picture provided";
  }
  if(id.length === 0) {
    throw "No id provided";
  }
  
  id = ObjectId(id);
  const userCollection = await user();
  const inputId = await userCollection.find({ _id: id }).toArray();
  if (inputId.length === 0) {
    throw "No user with that id";
  }
 
  const updateUser = {
    profilePicture: profilePicture,
  };

  const updatedInfo = await userCollection.updateOne(
    { _id: id },
    { $set: updateUser }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update user successfully";
  }
  return "success";
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = {             
  create,
  get,
  remove,
  update,    
  updatePicture,
};