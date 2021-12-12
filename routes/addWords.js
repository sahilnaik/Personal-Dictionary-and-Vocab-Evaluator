const express=require('express');
const router=express.Router();
const path = require('path');


router.get('/', async(req,res)=>{
    try{
        if(req.session.user){
        // res.sendFile(path.resolve('static/addWords.html'));
        let profilePicture= req.session.user.profilePicture;
        let firstName= req.session.user.firstName;
        let lastName= req.session.user.lastName;
        if(profilePicture==null || profilePicture==undefined || profilePicture==''|| firstName==null || firstName==undefined || firstName=='' || lastName==null || lastName==undefined || lastName==''){
            res.status(400).json({error: 'Please update your profile'}); 
        }
        res.render('words/addWords', {title:"Add Words",profilePicture: profilePicture, firstName: firstName, lastName: lastName});
    }
    else{
        res.redirect('/login');
    }
    
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;