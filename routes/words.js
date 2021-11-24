const { ObjectId } = require('bson');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { words } = require('../data/index')


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


router.post('/:id/addword', async (req, res) => {
    let addWordForm = req.body
    const { word, meaning, synonym, antonym, example } = addWordForm
    try {
        const wordDocument = await words.addWord( req.params.id, word, meaning, synonym, antonym, example);
        res.status(200).json(`Successfully added the word ${word}`)
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
