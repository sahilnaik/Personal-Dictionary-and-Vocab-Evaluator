const express=require('express');
const router=express.Router();
const data = require("../data");
const userData = data.users;
// const mcqData = data.mcq;
const { getAll, getLearning, getYetToLearn, getLearnt } = data.words

router.get('/', async(req,res)=>{
    try{
        firstName=req.session.user.firstName;
        lastName=req.session.user.lastName;
        profilePicture=req.session.user.profilePicture;
        email = req.session.user.email;
        phoneNumber = req.session.user.phoneNumber;
        let id = req.session.user._id;
        const { wordList, yetToLearnWords, learningWords, learntWords } = await getAll(id);
        return res.render('profile/profile', {title:"Profile",firstName: firstName,lastName: lastName, profilePicture: profilePicture, email:email,
        wordList: wordList, wordListLength: wordList.length, yetToLearnWords: yetToLearnWords, learningWords: learningWords,
        learntWords: learntWords, yetToLearnWordsLength: yetToLearnWords.length, learningWordsLength: learningWords.length,
        learntWordsLength: learntWords.length, phoneNumber: phoneNumber});
    }catch(e){
        
        return res.status(500).render('httpErrors/error', {code:'500', description: e});
    }
});

module.exports = router;