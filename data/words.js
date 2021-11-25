const mongoCollections = require('../config/mongoCollections')
let { ObjectId } = require('mongodb')
const words = mongoCollections.words


const createWordsDocument = async function createWordsDocument(userId) {
    let wordCollection = await words()
    // let result
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

const addWord = async function (userId,  word, meaning, synonym, antonym, example) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: userId})
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to add any words`}
    }
    word = word.toLowerCase()  
    let newWord = {
        word: word,
        meaning: meaning,
        synonyms: [],
        antonyms: [],
        examples: [],
        progress: "yet to learn",
        noOfTimesCorrect: 0
    }

    synonym = synonym.split(" ")
    synonym.forEach(x => {
        newWord.synonyms.push(x) 
    });
    antonym = antonym.split(" ")
    antonym.forEach(x =>{
        newWord.antonyms.push(x)
    })
    example = example.split(".")
    example.forEach(x =>{
        newWord.examples.push(x)
    })

    let result = await wordCollection.updateOne({userId: userId}, {$addToSet: {words: newWord}})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to add the word to the Document`} 
    }

    let wordDocumentWithWords = await wordCollection.findOne({userId: userId})
    if (!wordDocumentWithWords) {
        throw {code: 500, error: `Unable to get the word document after adding the word`}
    }
    // updating the YET TO LEARN KEY
    result = await wordCollection.updateOne({userId: userId}, {$set: {yetToLearn: wordDocumentWithWords.words.length}})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to update the overallRating of the restaurant`} 
    }

}

const editWord = async function editWord(userId, word, synonym, antonym, example) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: userId})
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to add any words`}
    }
    word = word.toLowerCase() 
    let editingWord 
    wordDocument.words.forEach(x => {
        if (x.word == word) {
            editingWord = x
        }
    })

    if (synonym && synonym.trim().length !== 0) {
        synonym = synonym.split(", ")
        synonym.forEach(x => {
            editingWord.synonyms.push(x) 
        });   
    }
    if (antonym && antonym.trim().length !== 0) {
        antonym = antonym.split(", ")
        antonym.forEach(x =>{
            editingWord.antonyms.push(x)
        })   
    }
    if (example && example.trim().length !== 0) {
        example = example.split(". ")
        example.forEach(x =>{
            editingWord.examples.push(x)
        })   
    }

    let result = await wordCollection.updateOne({userId: userId}, {$set: {words: wordDocument.words}})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to add the word to the Document`} 
    }
}


module.exports = {
    createWordsDocument,
    addWord, 
    editWord
}