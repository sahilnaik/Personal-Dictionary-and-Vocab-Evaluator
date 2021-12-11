const { ObjectId } = require('bson');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { words } = require('../data/index')
const xss = require("xss")

router.post('/createDocument', async (req, res) => {
    let signupForm = req.body
    const { userId } = signupForm
    try {
        const wordDocument = await words.createWordsDocument(userId);
        res.status(200).json(`Word document successfully created for User ID: ${userId} with document ID:${wordDocument}`)
    } catch (e) {
        if (e.code) {
            res.status(e.code).json(e.error)
        } else {
            res.status(400).json(e)          
        }
    }
})


router.post('/addWord', async (req, res) => {
    let addWordForm = req.body
    // const { word, meaning, synonym, antonym, example } = addWordForm
    const word = xss(addWordForm.word)
    const meaning = xss(addWordForm.meaning)
    const synonym = xss(addWordForm.synonym)
    const antonym = xss(addWordForm.antonym)
    const example = xss(addWordForm.example)
    try {
        const wordDocument = await words.addWord( req.session.user._id, word, meaning, synonym, antonym, example);
        res.status(200).redirect("/addWords");
    } catch (e) {
        if (e.code) {
            res.status(e.code).json(e.error)
        } else {
            console.log(e)
            res.status(400).json(e)          
        }
    }
})


router.post('/:id/editWord', async (req, res) => {
    let editWordForm = req.body
    const word = xss(editWordForm.wordinput);
    const synonym = xss(editWordForm.synonymsinput);
    // const meaning = xss(editWordForm.meaning)
    const antonym = xss(editWordForm.antonymsinput);
    const example = xss(editWordForm.exampleinput);
    console.log(word);
    console.log(synonym);
    console.log(antonym);
    console.log(example);

    try {
        const wordDocument = await words.editWord(req.params.id, word, synonym, antonym, example);
        res.status(200).redirect("/viewWords");
    } catch (e) {
        if (e.code) {
            res.status(e.code).json(e.error)
        } else {
            console.log(e)
            res.status(400).json(e)          
        }
    }
})


module.exports = router;
