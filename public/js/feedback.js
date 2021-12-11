let feedbackform = $('#feedback-form');
let feedback= $('#feedback');
let error=$('#error');
let ratings=$("input[name=rating]");


(function($){



        feedbackform.submit(function(event) {
        event.preventDefault();

        let feedbackVal=feedback.val()
        let ratingsVal=ratings.filter(":checked").val()
        
       

        if(!ratingsVal)
        {
            error.empty()
            error.append('Please Select Rating');
        
        }
        else if(!feedbackVal)
        {
            error.empty()
            error.append('Please Enter Feedback');
        }
        else if(check_for_spaces(feedbackVal))
        {
            error.empty()
            error.append('Enter Feedback Without Spaces');
        }
           
        else{
        var requestConfig={
            type: "POST",
            url: 'feedback/store',
            contentType: 'application/json',
            data: JSON.stringify({
                rating:ratingsVal,
                feedback:feedbackVal
            })

        }
        

        
    $.ajax(requestConfig).then(function(responseMessage) {
        
        if(responseMessage.success==true)
       {
         /* username.val("");
            feedback.val("");
            email.val("")
            ratings.prop( "checked", false );


        feedbackform.trigger("reset"); */

            feedbackform.hide()

            swal({
                title: 'Submitted',
                icon: 'success',
                button: true,
                
            }).then(function() {
                window.location = "/";
            })
       }

    }) 
}
    
    })


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

    
})(window.jQuery);