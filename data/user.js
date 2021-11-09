const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
let { ObjectId } = require("mongodb");

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
  const checkForLetters = (phoneNumber) =>
    [...phoneNumber].every((c) => "0123456789-".includes(c));

  if (checkForLetters(phoneNumber) === false) {
    throw "Phone number invalid";
  }
  let wordsId;
  let flashcardId;
  let overallLearnt;
  let mcqTestId;

  const userCollection = await user();

  let newUser = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    wordsId,
    flashcardId,
    overallLearnt,
    mcqTestId,
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Could not add user";
}

async function get(id) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  id = id.trim();
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }
  errorHandle(id);

  if (typeof id !== "string") throw "Id must be a string";
  let Id = ObjectId(id);

  if (!id) throw "You must provide an id to search for";
  const userCollection = await user();
  const inputId = await userCollection.findOne({ _id: Id });
  if (inputId === null) {
    throw "No User with that id";
  }

  inputId["_id"] = inputId["_id"].toString();

  return inputId;
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

module.exports = {
  create,
  get,
  remove,
  update,
};
