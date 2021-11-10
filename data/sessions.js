const mongoCollections = require('../config/mongoCollections');
const flashcard = mongoCollections.flashcard;




 module.exports={

async create_session(flashcardId,count,correct,incorrect)
{

let session=
{
    _id:count,
    words:[],
    correct:correct,
    incorrect:incorrect
}

let { ObjectId } = require('mongodb');

        let parsedId = ObjectId(flashcardId);

        const flashcardcollection = await flashcard();

let object=await flashcardcollection.updateOne({_id:parsedId},{ $push:{sessions:session}})



}



};