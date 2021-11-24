const mongoCollections = require('../config/mongoCollections')
let { ObjectId } = require('mongodb')
const words = mongoCollections.words


const createWordsDocument = async function createWordsDocument(userId) {
    let wordCollection = await words()
    let result
    let newWordObject = {
        _id: new ObjectId(),
        userId: userId,
        words: [],
        yetToLearn: 0,
        learning: 0,
        learnt: 0
    }
    
    // newWordObject.words.push(newWord)
    const insertWord = await wordCollection.insertOne(newWordObject)  
    if (insertWord.insertedCount === 0) {
        throw {code: 500, error: `Unable to add the word`}
    }


    return newWordObject._id
    
}

module.exports = {
    createWordsDocument
}