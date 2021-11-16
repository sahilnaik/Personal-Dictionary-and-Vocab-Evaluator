const mongoCollections = require('../config/mongoCollections')
let { ObjectId } = require('mongodb')
const words = mongoCollections.words

const addWord = async function (userId,  word, meaning, synonym, antonym, example) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: userId})
    word = word.toLowerCase()  
    let newWord = {
        word: word,
        meaning: meaning,
        synonym: synonym,
        antonym: antonym,
        example: example,
    }
    
}

module.exports = {
    addWord
}