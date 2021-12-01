const express=require('express');
const router=express.Router();
const path = require('path');
const flashcardData = require('../data/flashcard.js');
const { words } = require('../data/index')


router.get('/', async(req,res)=>{
    try{
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        const flashcardList = await flashcardData.create(req.session.user._id);
        res.render('flashcard/flashcard',{ profilePicture: profilePicture, firstName: firstName, lastName: lastName, flashcardList: flashcardList.words, flashcardId: flashcardList._id});
    }catch(e){
        res.status(500).json({error:e});
    }
});

router.get('/sessions', async (req, res) => {
    try{
        let sessionList=[];
        let session={};
        session["marks"]="5";
        session["total"]="10";
        session["percentage"]="50%";
        session["correct"]="Happy,Sad";
        session["incorrect"]="Lame,Day";
        sessionList.push(session);
        let session1={};
        session1["marks"]="8";
        session1["total"]="10";
        session1["percentage"]="80%";
        session1["correct"]="Rage,Sad";
        session1["incorrect"]="Lame,Sheer";
        sessionList.push(session1);
        let session2={};
        session2["marks"]="5";
        session2["total"]="10";
        session2["percentage"]="50%";
        session2["correct"]="Happy,Sad";
        session2["incorrect"]="Lame,Day";
        sessionList.push(session2);
        let session3={};
        session3["marks"]="8";
        session3["total"]="10";
        session3["percentage"]="80%";
        session3["correct"]="Rage,Sad";
        session3["incorrect"]="Lame,Sheer";
        sessionList.push(session3);
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        const noOfWords = await words.noOfWords(req.session.user._id);
        if (noOfWords <= 10) {
            res.render('flashcard/flashcardSessions',{layout: "sessionMain", insufficientWords: true, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
       
        } else{
            res.render('flashcard/flashcardSessions',{layout: "sessionMain", sessions:sessionList, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});

router.post("/flashcardsubmit", async (req, res) => {
    let stuff = req.body.mcqData; 
    let numberOfCorrect= req.body.number_of_correct;
    let userId = req.session.user._id;
    let sessionId = req.body.id
    try {
        const mcqList = await mcqData.updateSession(userId, sessionId, stuff, numberOfCorrect);
    } catch (error) {
        res.status(500).json({ error: error });
    }
        
    
    
  });
module.exports = router;