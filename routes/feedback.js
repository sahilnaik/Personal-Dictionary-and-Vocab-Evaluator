const { Router } = require('express');
const express = require('express');
const router = express.Router();
const data = require('../data/feedback');



function check_feedback(rating,feedback)
{


    if(!rating)
        {
           
            throw 'Please Select Rating';
        
        }
        else if(!feedback)
        {
            throw 'Please Enter Feedback';
        }
        else if(check_for_spaces(feedback))
        {
            throw 'Enter Feedback Without Spaces';
        }
}

function check_for_spaces(string)               //common code for strings
{
  string=string.trim()
  if(string.length>0)
  {
    return false;
  }
  else
  {
    return true;
  }
}


router.get('/',async (req,res)=>
{try{
    if(req.session.user){
        let firstName=req.session.user.firstName;
        let lastName=req.session.user.lastName;
        let profilePicture=req.session.user.profilePicture;

        res.render('feedback/feedback',{firstName: firstName,lastName: lastName,profilePicture: profilePicture});
    } 
    else{
        res.redirect('/login');
    }

}catch(e){
    res.status(500).json({error:"Hmmm something went wrong"});
}
})

router.post('/store',async(req,res)=>
{

    let firstName;
    let lastName;
    let email;
    rating=parseInt(req.body.rating)
    feedback=req.body.feedback.trim()


if(req.session.user)
{
    firstName=req.session.user.firstName;
    lastName=req.session.user.lastName;
    email = req.session.user.email

}

try {

  check_feedback(rating,feedback)

    let response=await data.create(firstName,lastName,email,rating,feedback);
    
    res.status(200).json({success:true});
  } 
  catch (e) {

    res.status(400).json({success:false});
  }

   
})



module.exports= router;