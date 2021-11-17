const mongoCollections = require('../config/mongoCollections')
let { ObjectId } = require('mongodb')
const words = mongoCollections.words
// import {v4 as uuidv4} from 'uuid';

const addWord = async function (userId,  word, meaning, synonym, antonym, example) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: userId})
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to add any words`}
    }
    word = word.toLowerCase()  
    let newWord = {
        // id: uuidv4(),
        word: word,
        meaning: meaning,
        synonyms: [],
        antonyms: [],
        examples: [],
        progress: "yet to learn",
        noOfTimesCorrect: 0
    }

    newWord.synonyms.push(synonym)
    newWord.antonyms.push(antonym)
    newWord.examples.push(example)

    let result = await wordCollection.updateOne({userId: userId}, {$addToSet: {words: newWord}})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to add the word to the Document`} 
    }
}

module.exports = {
    addWord
}