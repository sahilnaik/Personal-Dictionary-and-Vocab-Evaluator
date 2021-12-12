const mongoCollections = require('../config/mongoCollections')
let { ObjectId } = require('mongodb')
const words = mongoCollections.words

// Checks Start
const checkSameSynonym = async (synonym) =>{
    let sameSynonym = false
    for (let i = 1; i < synonym.length; i++) {
        if(synonym[i-1] == synonym[i]){
            sameSynonym = true
            throw {code: 401, error: `No 2 synonyms can be same. Every synonynm must be unique`}
        }
    }
}

const checkSameAntonym = async (antonym) => {
    let sameAntonym = false
    for (let i = 1; i < synonym.length; i++) {
        if(synonym[i-1] == synonym[i]){
            sameAntonym = true
            throw {code: 401, error: `No 2 antonyms can be same. Every antonym must be unique`}
        }  
    }
}

const checkSameExamples = async (antonym) => {
    let sameExample = false
    for (let i = 1; i < synonym.length; i++) {
        if(synonym[i-1] == synonym[i]){
            sameExample = true
            throw {code: 401, error: `No 2 examples can be same. Every example must be unique`}
        }   
    }
}
// Checks End
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
    await checkSameSynonym(synonym)

    synonym.forEach(x => {
        newWord.synonyms.push(x) 
    });
    
    
    antonym = antonym.split(", ")
    await checkSameAntonym(antonym)

    antonym.forEach(x =>{
        newWord.antonyms.push(x)
    })

    
    example = example.split(". ")
    await checkSameExamples(example)

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
        if (x.word.toLowerCase() == word) {
            editingWord = x
            indexof = i
            i++
            return false
        }
        i++
        return true
    })

    synonym = synonym.split(", ")
    await checkSameSynonym(synonym)
    
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

    if (antonym.length !== 0) {
        antonym = antonym.split(", ")
        await checkSameAntonym(antonym)

        let antonymLength = antonym.length
        if (editingWord.antonyms.length != 0) {
            for (let i = 0; i < antonymLength; i++) {
                let same = false
                for (let j = 0; j < editingWord.antonyms.length; j++) {
                    if (editingWord.antonyms[j] == antonym[i]) {
                        same = true
                        countA++
                        break
                    }            
                }  
            }   
        }else{
            countA = -2
        }
    } else {
        if (antonym.length == editingWord.antonyms.length) {
            countA = 0
        } else{
            countA = -1
        }
    }    
    
    if (example.length !== 0) {
        example = example.split(". ")
        await checkSameExamples(example)

        let exampleLenght = example.length
        if (editingWord.examples.length != 0) {
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
        } else{
            countE = -2
        }
    } else {
        if (example.length == editingWord.examples.length) {
            countE = 0
        }else{
            countE = -1
        }
    }    

    if (countS == editingWord.synonyms.length && countA == editingWord.antonyms.length && countE == editingWord.examples.length) {
        throw  `Please provide at least 1 of the elements different in order to edit`
    }

    if (countS != editingWord.synonyms.length) {
        editingWord.synonyms = synonym
    }

    if (countA != editingWord.antonyms.length) {
        editingWord.antonyms = antonym
    }

    if (countE != editingWord.examples.length) {
        editingWord.examples = example
    }


    wordDocument.words.every(x => {
        if (x.word.toLowerCase() == word) {
            x = editingWord
            return false
        }
        return true
    })

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

const updateAllWordsProgress = async function updateAllWordsProgress(userId, correctArray, incorrectArray) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})

    correctArray.forEach(x => {
        wordDocument.words.every(async y => {
            if (x.toLowerCase() == y.word.toLowerCase()) {
                y.noOfTimesCorrect++
                if (y.noOfTimesCorrect == 3) {
                    y.progress = "learnt"
                }
                let updatingNoOfTimesCorrect = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
            }
        })
    })

    incorrectArray.forEach(x => {
        wordDocument.words.every(async y => {
            if (x.toLowerCase() == y.word.toLowerCase()) {
                if (y.progress == "learnt") {
                    y.progress = "learning"
                    y.noOfTimesCorrect = 1
                    let updatingNoOfTimesCorrect = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
                }
            }
        })
    })
}

const updateProgressToLearning = async function updateProgressToLearning(userId, word) {
    let wordCollection = await words()
    let wordDocument = await wordCollection.findOne({userId: ObjectId(userId)})
    
    await wordDocument.words.every(async x =>{
        if (x.word == word) {
            x.progress = "learning"
            let updatingProgress = await wordCollection.updateOne({userId: ObjectId(userId)}, {$set: {words: wordDocument.words}})
            if (!updatingProgress) {
                throw {code: 500, error: `Cannot update the progress status of the word to learning`}
            }
        }
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
}
module.exports = {
    createWordsDocument,
    addWord, 
    editWord,
    getAll,
    noOfWords,
    updateAllWordsProgress,
    updateProgressToLearning,
    updateCounters,
}