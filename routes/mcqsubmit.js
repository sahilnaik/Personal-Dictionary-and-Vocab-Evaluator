const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const path = require("path");
const data = require("../data");
const mcqData = data.mcq;

router.post("/", async (req, res) => {
    let stuff = req.body.mcqData; 
    let numberOfCorrect= req.body.number_of_correct;
    let userId = req.session.user._id;
    let sessionId = req.body.id
    if(!Array.isArray(stuff)){
        return res.status(400).render('httpErrors/error', {code:'400', description: "Not an array"});
    }   
    if(!ObjectId.isValid(userId)){
        return res.status(400).render('httpErrors/error', {code:'400', description: "Invalid user id"});
    }
   
    if(typeof numberOfCorrect !== "string" || typeof userId !== "string" || typeof sessionId !== "string"){
        return res.status(400).render('httpErrors/error', {code:'400', description: "Not a string"});
    }
    try {
        const mcqList = await mcqData.updateSession(userId, sessionId, stuff, numberOfCorrect);
    } catch (error) {
        return res.status(500).render('httpErrors/error', {code:'500', description: error});
    }
        
    
    
  });
  module.exports = router;