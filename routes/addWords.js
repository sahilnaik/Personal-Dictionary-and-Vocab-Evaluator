const { ObjectId } = require('bson');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { addWord } = require('../data/index')


router.post('/:id', async (req, res) => {
    let addWordForm = req.body
    const { word, meaning, synonym, antonym, example } = addWordForm
    try {
        const wordDocument = await addWord.addWord( req.params.id, word, meaning, synonym, antonym, example);
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
