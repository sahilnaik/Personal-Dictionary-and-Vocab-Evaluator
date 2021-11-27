const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const mcqData = data.mcq;

router.post("/", async (req, res) => {
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