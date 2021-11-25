const express=require('express');
const router=express.Router();


router.get('/', async(req,res)=>{
    try{
        firstName=req.session.user.firstName;
        lastName=req.session.user.lastName;
        profilePicture=req.session.user.profilePicture;
        res.render('profile/profile', {firstName: firstName,lastName: lastName,profilePicture: profilePicture});
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;