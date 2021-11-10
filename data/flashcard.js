const mongoCollections = require('../config/mongoCollections');
const flashcard = mongoCollections.flashcard;


module.exports={

async create()
{

    let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();

        let newflashcard=
        {
                userId:newObjId,
                sessions:[]
        };

        const flashcardcollection = await flashcard();
        const insertInfo = await flashcardcollection.insertOne(newflashcard);


},




};