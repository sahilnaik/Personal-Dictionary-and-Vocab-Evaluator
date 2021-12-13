const mongoCollections = require('../config/mongoCollections');
const feedbacks = mongoCollections.feedback;


function check_feedback(rating, feedback)
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
      if(string.length>0){
        return false;
      } else{
        return true;
      }
    }


async function create(firstName,lastName,email,rating,feedback)
{
    check_for_spaces(firstName);
    check_for_spaces(lastName);
    check_for_spaces(email);
    if(!firstName || !lastName || !email || !rating || !feedback || firstName === null || lastName === null || email === null || rating === null || feedback === null)
    {
        throw 'Invalid Input';
    }
    check_feedback(rating, feedback)

    let data= {
        firstName: firstName,
        lastName: lastName,
        email: email,
        rating: rating,
        feedback: feedback
    }

    const feedbackcollection = await feedbacks();
    const insertInfo = await feedbackcollection.insertOne(data);
}


module.exports = {
    create
}

