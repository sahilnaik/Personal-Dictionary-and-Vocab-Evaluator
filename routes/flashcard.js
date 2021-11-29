const express=require('express');
const router=express.Router();
const path = require('path');
const { words } = require('../data/index')


router.get('/', async(req,res)=>{
    try{
        // res.sendFile(path.resolve('static/flashcard.html'));
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        const noOfWords = await words.noOfWords(req.session.user._id)
        if (noOfWords <= 10) {
            res.render('flashcard/flashcard',{ insufficientWords: true, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
       
        } else{
            res.render('flashcard/flashcard',{ profilePicture: profilePicture, firstName: firstName, lastName: lastName});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;