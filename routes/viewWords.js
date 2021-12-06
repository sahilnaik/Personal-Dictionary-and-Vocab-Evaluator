const express=require('express');
const router=express.Router();
const path = require('path');
const data = require("../data");
const userData = data.users;
// const mcqData = data.mcq;
const { getAll } = data.words


router.get('/', async(req,res)=>{
    try{
        // res.sendFile(path.resolve('static/addWords.html'));
        let id = req.session.user._id;
        const wordList = await getAll(id);
        const yetToLearnWords = await getYetToLearn(id)
        const learntWords = await getLearnt(id)
        const learningWords = await getLearning(id)
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        res.render('words/viewWords', {title:"View Words", noOfWords: wordList.length, wordList: wordList, profilePicture: profilePicture, firstName: firstName, lastName: lastName,userId:id});
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;