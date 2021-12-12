const express=require('express');
const { ObjectId } = require('mongodb');
const router=express.Router();
const path = require('path');
const flashcardData = require('../data/flashcard.js');
const { words } = require('../data/index')


router.get('/', async(req,res)=>{
    try{
        if(req.session.user){
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        if(profilePicture==null || profilePicture==undefined || profilePicture=='' || firstName==null || firstName==undefined || firstName=='' || lastName==null || lastName==undefined || lastName==''){
            res.status(400).json({error: "Please update your profile"});
        }
        if(!ObjectId.isValid(req.session.user._id)){
            res.status(400).json({error: "Invalid id"});
        }
        const flashcardList = await flashcardData.create(req.session.user._id);
        res.render('flashcard/flashcard',{ title:"Flashcard",profilePicture: profilePicture, firstName: firstName, lastName: lastName, flashcardList: flashcardList.words, flashcardId: flashcardList._id});
        }
        else{
            res.redirect('/login');
        }

    }catch(e){
        res.status(500).json({error:e});
    }
});

router.get('/sessions', async (req, res) => {
    try{
        if(req.session.user){
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        if(profilePicture==null || profilePicture==undefined || profilePicture=='' || firstName==null || firstName==undefined || firstName=='' || lastName==null || lastName==undefined || lastName==''){
            res.status(400).json({error: "Please update your profile"});
        }
        if(!ObjectId.isValid(req.session.user._id)){
            res.status(400).json({error: "Invalid id"});
        }
        
        const noOfWords = await words.noOfWords(req.session.user._id);
        if (noOfWords <= 9) {
            res.render('flashcard/flashcardSessions',{title:"Flashcard",layout: "sessionMain", insufficientWords: true, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
       
        } else{
            const sessionList = await flashcardData.getLastFiveSessions(req.session.user._id);
            
            res.render('flashcard/flashcardSessions',{title:"Flashcard",layout: "sessionMain", sessions:sessionList, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
        }
        }
        else{
            res.redirect('/login');
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});

router.post("/flashcardsubmit", async (req, res) => {
    
    let stuff = req.body.flashcardData; 
    let numberOfCorrect= req.body.number_of_correct;
    let userId = req.session.user._id;
    let sessionId = req.body.id;
    if(!Array.isArray(stuff)){
        res.status(400).json({error: "Invalid data"});
    }
    if(!ObjectId.isValid(sessionId)){
        res.status(400).json({error: "Invalid session id"});
    }
    if(typeof numberOfCorrect !== 'string'){
        res.status(400).json({error: "Invalid number of correct"});
    }
    if(!ObjectId.isValid(userId)){
        res.status(400).json({error: "Invalid user id"});
    }
        

    try {
       
        const flashcardList = await flashcardData.updateSession(userId, sessionId, stuff, numberOfCorrect);
       
    } catch (error) {
        res.status(500).json({ error: error });
    }
        
    
    
  });
module.exports = router;