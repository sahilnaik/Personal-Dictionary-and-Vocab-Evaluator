const express=require('express');
const router=express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
const mcqData = data.mcq;
const { words } = require('../data/index');

router.get('/', async(req,res)=>{
    try{
        let id = req.session.user._id;
        const mcqList = await mcqData.create(id); 
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        return res.render('mcq/mcqTest', {title:"MCQ",mcqId: mcqList._id ,mcqList: mcqList.words, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
    }catch(e){
       
        return res.status(500).render('httpErrors/error', {code:'500', description: e});
    }
});

router.get('/sessions', async (req, res) => {
    try{
        
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        
        const noOfLearntWords = await words.getAll(req.session.user._id);
        if (noOfLearntWords.learntWords.length < 5) {
            return res.render('mcq/mcqSessions',{title:"MCQ",layout: "sessionMain", insufficientWords: true, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
       
        } else{
            const sessionList = await mcqData.getLastFiveSessions(req.session.user._id);
            
            return res.render('mcq/mcqSessions',{title:"MCQ",layout: "sessionMain", sessions:sessionList, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
        }
    }catch(e){
        return res.status(500).render('httpErrors/error', {code:'500', description: e});
    }
});

module.exports = router;