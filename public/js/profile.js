window.addEventListener('load', (event) => {
    let firstName=document.getElementById("firstName").innerText;
    let lastName=document.getElementById("lastName").innerText;
    let profilePicture = document.getElementById("profilePicture").innerText;
    console.log('page is fully loaded');
    let name=firstName+" "+lastName;
    document.getElementById("right_name").innerText=name;
    document.getElementById("p_name").innerText=name;
    
    document.getElementById("img_profile").src=`../../public/uploads/${profilePicture}`;

    let total_no_of_words=document.getElementById("noOfWords").innerText;
    let words_yetToLearn=document.getElementById("noOfYetToLearnWords").innerText;
    let words_learning=document.getElementById("noOfLearningWords").innerText;
    let words_learnt=document.getElementById("noOfLearntWords").innerText;

    let percentage1;
    if(total_no_of_words==0 || words_learnt==0){
        percentage1=0;
    }else{
        percentage1=words_learnt/total_no_of_words*100;
        percentage1=Math.round(percentage1);
    }
    document.getElementById("progress_bar_1").style.width=percentage1+"%";
    document.getElementById("perc1").innerText=percentage1+"%";
    document.getElementById("wordCount1").innerText=words_learnt;
    document.getElementById("wordTotal1").innerText=total_no_of_words;

    let percentage2;
    if(total_no_of_words==0 || words_yetToLearn==0){
        percentage2=0;
    }else{
        percentage2=words_yetToLearn/total_no_of_words*100;
        percentage2=Math.round(percentage2);
    }
    document.getElementById("progress_bar_2").style.width=percentage2+"%";
    document.getElementById("perc2").innerText=percentage2+"%";
    document.getElementById("wordCount2").innerText=words_yetToLearn;
    document.getElementById("wordTotal2").innerText=total_no_of_words;

    let percentage3;
    if(total_no_of_words==0 || words_learning==0){
        percentage3=0;
    }else{
        percentage3=words_learning/total_no_of_words*100;
        percentage3=Math.round(percentage3);
    }
    document.getElementById("progress_bar_3").style.width=percentage3+"%";
    document.getElementById("perc3").innerText=percentage3+"%";
    document.getElementById("wordCount3").innerText=words_learning;
    document.getElementById("wordTotal3").innerText=total_no_of_words;
});



function uploadpic(){
console.log("entered");
let file=document.getElementById('myfile');
let myForm=document.getElementById('myForm');
file.click();
let upload = document.getElementById('Upload');
file.addEventListener("change", function() {
    myForm.submit();
    for (var i = 0; i < file.files.length; i++) {
        console.log(file.files[i].name);
        document.getElementById("profile_pic").src=URL.createObjectURL(file.files[i]);
        
    }  

    

}, false);
}