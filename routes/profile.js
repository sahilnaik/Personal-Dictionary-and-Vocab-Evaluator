const express=require('express');
const router=express.Router();


router.get('/', async(req,res)=>{
    try{
        firstName=req.session.user.firstName;
        lastName=req.session.user.lastName;
        profilePicture=req.session.user.profilePicture;
        email = req.session.user.email;
        res.render('profile/profile', {title:"Profile",firstName: firstName,lastName: lastName, profilePicture: profilePicture, email:email});
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;