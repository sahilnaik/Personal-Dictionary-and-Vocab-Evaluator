const express=require('express');
const router=express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
const mcqData = data.mcq;

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