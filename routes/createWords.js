const { ObjectId } = require('bson');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { wordsDocument } = require('../data/index')


router.post('/', async (req, res) => {
    let signupForm = req.body
    const { userId } = signupForm
    try {
        const wordDocument = await wordsDocument.createWordsDocument(userId);
        res.status(200).json(`Word document successfully created for User ID: ${userId} with document ID:${wordDocument}`)
    } catch (e) {
        if (e.code) {
            res.status(e.code).json(e.error)
        } else {
            res.status(400).json(e)          
        }
    }
})

module.exports = router;
