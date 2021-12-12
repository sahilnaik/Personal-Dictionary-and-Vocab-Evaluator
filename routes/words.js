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
         
            res.status(e.code).render("words/addWords", {title:"Add Words",profilePicture: profilePicture,error: e.error, firstName: firstName, lastName: lastName})
    
        } else {
        
            return res.status(500).render('httpErrors/error', {code:'500', description: e});         
           
        }
    }
})


router.post('/addWord', async (req, res) => {
    let addWordForm = req.body
    let profilePicture= req.session.user.profilePicture;
    let firstName= req.session.user.firstName;
    let lastName= req.session.user.lastName;

    const word = xss(addWordForm.word)
    const meaning = xss(addWordForm.meaning)
    const synonym = xss(addWordForm.synonym)
    const antonym = xss(addWordForm.antonym)
    const example = xss(addWordForm.example)
    
    let testSynonym = synonym.split(", ").sort().join("")
    if(!word || !meaning || !synonym){
        return res.status(400).render('httpErrors/error', {code:'400', description: "Please fill all the fields"});         
        }
        if(word.trim().length == 0 || meaning.trim().length == 0 || synonym.trim().length == 0) {
            
            return res.status(400).render('httpErrors/error', {code:'400', description: "Please fill all the fields"});
        }
        if(word == meaning || word == synonym || word == antonym || meaning == synonym || meaning == antonym || synonym == antonym) {
            return res.status(400).render('httpErrors/error', {code:'400', description: "All the fields should be different"});
        }
        if(!word.match(/^[a-zA-Z]+$/)) {
            
            return res.status(400).render('httpErrors/error', {code:'400', description: "Word should contain only alphabets"});
        }
        if(!meaning.match(/^[a-zA-Z ]+$/)) {
            return res.status(400).render('httpErrors/error', {code:'400', description: "Meaning should contain only alphabets"});
        }
        if(antonym.length!==0){
            
            let testAntonym = antonym.split(", ").sort().join("")

            if(testSynonym=== testAntonym){
            
                return res.status(401).render('httpErrors/error', {code:'401', description: "Synonyms and Antonyms cannot be same"});
            }
            if(!testSynonym.match(/^[a-zA-Z]+$/) || !testAntonym.match(/^[a-zA-Z]+$/)) {
                
                return res.status(401).render('httpErrors/error', {code:'401', description: "Synonyms and Antonyms should contain only alphabets"});
            }
        }
        if (example.length !== 0) {
            let testEg = example.split(". ");
            for (let i = 0; i < testEg.length; i++) {
                testEg[i] = testEg[i].trim()
                if(testEg[i].length == 0) {
                    
                    return res.status(401).render('httpErrors/error', {code:'401', description: "Example cannot be empty"});
                }
                
            }
        }
    try {
        const wordDocument = await words.addWord( req.session.user._id, word, meaning, synonym, antonym, example);
        return res.status(200).render("words/addWords", {title:"Add Words", profilePicture: profilePicture, firstName: firstName, lastName: lastName });
    } catch (e) {
        if (e.code) {
            return res.status(e.code).render("words/addWords", {title:"Add Words",profilePicture: profilePicture,error: e.error, firstName: firstName, lastName: lastName})
        } else {
            console.log(e)
            return res.status(500).render('httpErrors/error', {code:'500', description: e});         
       
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

    let testSynonym = synonym.split(", ").sort().join("")
    if(!word || !synonym){
        return res.status(400).render('httpErrors/error', {code:'400', description: "Please fill all the fields"});         
        }
        if(word.trim().length == 0 || synonym.trim().length == 0) {
            
            return res.status(400).render('httpErrors/error', {code:'400', description: "Please fill all the fields"});
        }
        if(word == synonym || word == antonym || synonym == antonym) {
            return res.status(400).render('httpErrors/error', {code:'400', description: "All the fields should be different"});
        }
        if(!word.match(/^[a-zA-Z]+$/)) {
            
            return res.status(400).render('httpErrors/error', {code:'400', description: "Word should contain only alphabets"});
        }
       
        if(antonym.length!==0){
            
            let testAntonym = antonym.split(", ").sort().join("")

            if(testSynonym=== testAntonym){
            
                return res.status(401).render('httpErrors/error', {code:'401', description: "Synonyms and Antonyms cannot be same"});
            }
            if(!testSynonym.match(/^[a-zA-Z]+$/) || !testAntonym.match(/^[a-zA-Z]+$/)) {
                
                return res.status(401).render('httpErrors/error', {code:'401', description: "Synonyms and Antonyms should contain only alphabets"});
            }
        }
        if (example.length !== 0) {
            let testEg = example.split(". ");
            for (let i = 0; i < testEg.length; i++) {
                testEg[i] = testEg[i].trim()
                if(testEg[i].length == 0) {
                    
                    return res.status(401).render('httpErrors/error', {code:'401', description: "Example cannot be empty"});
                }
                
            }
        }

    try {
        const wordDocument = await words.editWord(req.params.id, word, synonym, antonym, example);
        return res.status(200).redirect("/viewWords");
    } catch (e) {
        if (e.code) {
           // res.status(e.code).json(e.error)
            return res.status(e.code).render('httpErrors/error', {code:e.code, description: e.error});
        } else {
          //  console.log(e)
           // res.status(400).json(e) 
            return res.status(500).render('httpErrors/error', {code:'500', description: e});         
        }
    }
})


module.exports = router;
