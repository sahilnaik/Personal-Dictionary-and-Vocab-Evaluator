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
        res.render('mcq/mcqTest', {mcqId: mcqList._id ,mcqList: mcqList.words, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
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
        sessionList.push(session3);let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        const noOfWords = await words.noOfWords(req.session.user._id);
        if (noOfWords <= 10) {
            res.render('mcq/mcqSessions',{layout: "sessionMain", insufficientWords: true, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
       
        } else{
            res.render('mcq/mcqSessions',{layout: "sessionMain", sessions:sessionList, profilePicture: profilePicture, firstName: firstName, lastName: lastName});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});
// router.get('/getMCQ', async(req,res)=>{
//     try{
//         let id = req.session.user._id;
//         const mcqList = await mcqData.create(id); 
//         let profilePicture= req.session.user.profilePicture;
//         let firstName= req.session.user.firstName;
//         let lastName= req.session.user.lastName;
       
//     }
//     catch(e){
//         res.status(500).json({error:e});
//     }
// });
module.exports = router;