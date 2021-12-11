const mongoCollections = require('../config/mongoCollections')
let { ObjectId } = require('mongodb')
const words = mongoCollections.words


const createWordsDocument = async function createWordsDocument(userId) {
    let wordCollection = await words()
    userId = ObjectId(userId)
     let newWordObject = {
        _id: new ObjectId(),
        userId: userId,
        words: [],
        yetToLearn: 0,
        learning: 0,
        learnt: 0
    }
    
    const insertWord = await wordCollection.insertOne(newWordObject)  
    if (insertWord.insertedCount === 0) {
        throw {code: 500, error: `Unable to create the word Document`}
    }



    return newWordObject._id
    
}

const addWord = async function (userId,  word, meaning, synonym, antonym, example) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to add any words`}
    }
    word = word.toLowerCase()  

    wordDocument.words.forEach(x =>{
        if (x.word.toLowerCase() === word) {
            throw {code: 401, error: "Word already exists in the database."}
        }
    })

    let newWord = {
        word: word,
        meaning: meaning,
        synonyms: [],
        antonyms: [],
        examples: [],
        progress: "yet to learn",
        noOfTimesCorrect: 0
    }

    synonym = synonym.split(", ")
    synonym.forEach(x => {
        newWord.synonyms.push(x) 
    });
    antonym = antonym.split(", ")
    antonym.forEach(x =>{
        newWord.antonyms.push(x)
    })
    example = example.split(". ")
    example.forEach(x =>{
        newWord.examples.push(x)
    })

    let result = await wordCollection.updateOne({userId: ObjectId(userId)}, {$addToSet: {words: newWord}})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to add the word to the Document`} 
    }

    let wordDocumentWithWords = await wordCollection.findOne({userId: ObjectId(userId)})
    if (!wordDocumentWithWords) {
        throw {code: 500, error: `Unable to get the word document after adding the word`}
    }

    // updating the YET TO LEARN KEY
    await updateCounters(userId)

}

const editWord = async function editWord(userId, word, synonym, antonym, example) {
    if (!synonym) {
        throw `Synonyms Cannot be empty`
    }
    if (synonym.trim().length == 0) {
        throw `Items to be edited cannot be just empty spaces.`
    }

    synonym = synonym.trim(), antonym = antonym.trim(), example = example.trim()
    let countS = 0, countA = 0, countE = 0
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)});
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to add any words`}
    }
    word = word.toLowerCase() 
    let editingWord, i=0, indexof
    wordDocument.words.every(x => {
        i++
        if (x.word.toLowerCase() == word) {
            editingWord = x
            indexof = i
            return false
        }
        return true
    })

    synonym = synonym.split(", ")
    let synonymLenght = synonym.length
    for (let i = 0; i < synonymLenght; i++) {
        let same = false
        for (let j = 0; j < editingWord.synonyms.length; j++) {
            if (editingWord.synonyms[j] == synonym[i]) {
                same = true
                countS++
                break
            }            
        }  
    }

    if (antonym.trim().length !== 0) {
        antonym = antonym.split(", ")
        let antonymLenght = antonym.length
        for (let i = 0; i < antonymLenght; i++) {
            let same = false
            for (let j = 0; j < editingWord.antonyms.length; j++) {
                if (editingWord.antonyms[j] == antonym[i]) {
                    same = true
                    countA++
                    break
                }            
            }  
        }
    }    
    
    if (example.trim().length !== 0) {
        example = example.split(". ")
        let exampleLenght = example.length
        for (let i = 0; i < exampleLenght; i++) {
            let same = false
            for (let j = 0; j < editingWord.examples.length; j++) {
                if (editingWord.examples[j] == example[i]) {
                    same = true
                    countE++
                    break
                }            
            }  
        }
    }

    if (countS == synonym.length && countA == antonym.length && countE == example.length) {
        throw  `Please provide at least 1 of the elements different in order to edit`
    }

    if (countS != synonym.length) {
        editingWord.synonyms = synonym
    }

    if (countA != antonym.length) {
        editingWord.antonyms = antonym
    }

    if (countE != example.length) {
        editingWord.examples = example
    }

    // wordCollection.words = wordCollection.words.splice(indexof, 1, editingWord)

    let result = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to add the word to the Document`} 
    }
}

const getAll = async function getAll(userId) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to display words`}
    }

    let wordList = wordDocument.words
    let yetToLearnWords = [], learningWords = [], learntWords = []
    wordDocument.words.forEach(x =>{
        if (x.progress == "yet to learn") {
           yetToLearnWords.push(x) 
        } else if (x.progress == "learning"){
            learningWords.push(x)
        } else {
            learntWords.push(x)
        }
    })

    return { wordList, yetToLearnWords, learningWords, learntWords }
}


const noOfWords = async function noOfWords(userId) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})
    if (!wordDocument) {
        throw {code: 404, error: `No such userId exists to display`}
    }

    return wordDocument.words.length   
}

const updateAllWordsProgress = async function updateAllWordsProgress(userId, correctArray) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})

    correctArray.forEach(x => {
        wordDocument.words.every(async y => {
            if (x.toLowerCase() == y.word.toLowerCase()) {
                if (y.noOfTimesCorrect == 3) {
                    await updateProgressToLearnt(userId, y.word.toLowerCase())
                }
                y.noOfTimesCorrect++
                let updatingNoOfTimesCorrect = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
                if (!updatingNoOfTimesCorrect) {
                    throw {code: 500, error: `Cannot update the no of words counter`}
                }
                return false
            }
            return true
        })
    })
}

const updateProgressToLearning = async function updateProgressToLearning(userId, word) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})
    
    wordDocument.words.every(async x =>{
        if (x.word == word) {
            x.progress = "learning"
            let updatingProgress = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
            if (!updatingProgress) {
                throw {code: 500, error: `Cannot update the progress status of the word to learning`}
            }
            return false
        }
        return true
    })

}

const updateProgressToLearnt = async function updateProgressToLearnt(userId, word) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})

    wordDocument.words.every(async x =>{
        if (x.word == word) {
            x.progress = "learnt"
            let updatingProgress = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
            if (!updatingProgress) {
                throw {code: 500, error: `Cannot update the progress status of the word to learnt`}
            }
            return false
        }
        return true
    })
}

const updateCounters = async function updateCounters(userId) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})

    let yetToLearnWords = [], learningWords = [], learntWords = []
    wordDocument.words.forEach(x =>{
        if (x.progress == "yet to learn") {
           yetToLearnWords.push(x) 
        } else if (x.progress == "learning"){
            learningWords.push(x)
        } else {
            learntWords.push(x)
        }
    })
    
    result = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {yetToLearn: yetToLearnWords.length, learning:learningWords.length, learnt: learntWords.length }})
    if (result.modifiedCount === 0) {
        throw {code: 500, error: `Unable to update the Learning Counters`} 
    }

}
module.exports = {
    createWordsDocument,
    addWord, 
    editWord,
    getAll,
    noOfWords,
    updateAllWordsProgress,
    updateProgressToLearning,
    updateProgressToLearnt,
    updateCounters,
}