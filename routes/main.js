const express=require('express');
const router=express.Router();
const path = require('path');
const mcqData = require("../data/mcq");

router.get('/', async(req,res)=>{
    try{
        firstName=req.session.user.firstName;
        lastName=req.session.user.lastName;
        profilePicture=req.session.user.profilePicture;
        email = req.session.user.email;
        const mcqScore = await mcqData.getPercentage(email);
        const mcqSession = await mcqData.getLastFiveSessionScore(req.session.user._id);
        const scores = mcqSession.scores;
        const mcqSessionId = mcqSession.sessionId;
        res.render('dashboard/dashboard', {
            layout: "dashboardMain",firstName: firstName,lastName: lastName,profilePicture: profilePicture, email:email, mcqScore: mcqScore, mcqSession: scores, mcqSessionId: mcqSessionId});
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;