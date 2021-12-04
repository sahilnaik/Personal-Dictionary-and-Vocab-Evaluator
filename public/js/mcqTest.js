window.addEventListener('load', (event) => {
    document.getElementsByClassName("sidebar-mcq")[0].style.backgroundColor="rgb(53, 51, 51)";
});

let wordindex=-1;
let no=0;
let words=[];
let number_of_correct=0;

function startTest(){
    document.getElementById("startMCQTest").style.display="none";
    initialize();
    wordindex++;
    que("next");
    document.getElementById("mcq_box").style.display="grid";
}
let questions=[];
let options=[];
let answers=[];

let word_i=document.getElementsByClassName("word_i");
let option_i=document.getElementsByClassName("option_i");
let answers_i=document.getElementsByClassName("answers_i");

let mcqId=document.getElementById("mcq_id").innerText;

for(let i=0;i<10;i++){
    questions.push(word_i[i].innerHTML);
    options.push(option_i[i].innerHTML);
    answers.push(answers_i[i].innerHTML);
}

function initialize(){
    let session={};
    let word={};
    let temp=questions[0];
    console.log(temp.question_word);
    for(let i=0;i<10;i++){
        word["question_word"]=questions[i];
        word["options"]=options[i].split(",");
        word["answer"]=answers[i];
        word["userSelection"]="";
        word["correctOrNot"]="";
        
        words.push(word);
        word={};
        
    }
    
    session["words"]=words;
}

function que(page){
    if(page==="next"){
        no++;
        console.log("Question No: "+no);
        if(no===1){
            document.getElementById("prev-button").style.display="none";
        }else{
            document.getElementById("prev-button").style.display="flex";
        }

        if(no===10){
            document.getElementById("next-button").style.display="none";
            document.getElementById("submit-button").style.display="flex";
        }else{
            document.getElementById("next-button").style.display="flex";
        }
        document.getElementById("no").innerText=no;
        let word3=words[wordindex];
        document.getElementById("word").innerHTML=word3["question_word"];
        let options=word3["options"];
        document.getElementById("label_option1").innerHTML=options[0];
        document.getElementById("label_option2").innerHTML=options[1];
        document.getElementById("label_option3").innerHTML=options[2];
        document.getElementById("label_option4").innerHTML=options[3];
    }
    else if(page==="prev"){
        no--;
        console.log("Question No: "+no);
        if(no===1){
            document.getElementById("prev-button").style.display="none";
        }else{
            document.getElementById("prev-button").style.display="flex";
        }
        
        if(no===10){
            document.getElementById("next-button").style.display="none";
            document.getElementById("submit-button").style.display="flex";
        }else{
            document.getElementById("next-button").style.display="flex";
        }
        document.getElementById("no").innerText=no;
        let word3=words[wordindex];
        document.getElementById("word").innerHTML=word3["question_word"];
        let options=word3["options"];
        document.getElementById("label_option1").innerHTML=options[0];
        document.getElementById("label_option2").innerHTML=options[1];
        document.getElementById("label_option3").innerHTML=options[2];
        document.getElementById("label_option4").innerHTML=options[3];
    }
    

}

function optionSelect(){
    document.getElementById("buttons").style.display="flex";
    let ele=document.getElementsByName("mcq_ans");
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
           console.log(ele[i].id);
           console.log(document.getElementById("label_"+ele[i].id).innerText);
           words[wordindex]["userSelection"]=document.getElementById("label_"+ele[i].id).innerText;
        }
    }
    
}

function next(){
    wordindex++;
    que("next");
    var ele = document.getElementsByName("mcq_ans");
    for(var i=0;i<ele.length;i++){
        console.log(words[wordindex]["userSelection"]);
        console.log(wordindex);
        console.log(document.getElementById("label_"+ele[i].id).innerText);
        if(words[wordindex].userSelection===document.getElementById("label_"+ele[i].id).innerText){
            ele[i].checked = true;
        }else{
            ele[i].checked = false;
        }
    }

}

function prev(){
    wordindex--;
    que("prev");
    var ele = document.getElementsByName("mcq_ans");
    for(var i=0;i<ele.length;i++){
        console.log(words[wordindex]["userSelection"]);
        console.log(wordindex);
        console.log(document.getElementById("label_"+ele[i].id).innerText);
        if(words[wordindex]["userSelection"]===document.getElementById("label_"+ele[i].id).innerText){
            ele[i].checked = true;
        }else{
            ele[i].checked = false;
        }
    }
}

function eval(){
    for(let k=0;k<words.length;k++){
        if(words[k]["userSelection"]===words[k]["answer"]){
            words[k]["correctOrNot"]=true;
            number_of_correct++;
        }else{
            words[k]["correctOrNot"]=false;
        }   
    }
    console.log(words);
    console.log(number_of_correct);
    let percentage=Math.round(number_of_correct/words.length*100);
    console.log("Marks secured: "+number_of_correct+" out of "+words.length);
    console.log("Percentage of Marks secured: "+percentage);
    triggerGraphs(number_of_correct,words.length,percentage);
    let session={};
    session["words"]=words;
    
    session["number_of_correct"]=number_of_correct;
    
    document.getElementsByTagName("html")[0].style.height="1600px";
    document.body.style.height="1600px";
    document.getElementsByClassName("main-box")[0].style.height="1600px";
    document.getElementsByClassName("main-dashboard")[0].style.height="1600px";
    return session;
}
(function($) {

$('#submit-button').click(function() {
    let data = eval();
    console.log(data.words);
    console.log(data.number_of_correct);
    $.ajax({
        
        url: '/mcqsubmit',
        type: 'POST',
        data: {
            mcqData: data.words,
            number_of_correct: data.number_of_correct,
            id:mcqId
        },
        
        success: function(msg) {
            alert('Email Sent');
        }               
    });
});
})(jQuery);


function triggerGraphs(number_of_correct,number_of_words,percentage){
        console.log("entered");
        document.getElementById("mcq_box").style.display="none";
        document.getElementById("result_box").style.display="grid";
        for(let k=0;k<words.length;k++){
            let row=document.createElement("tr");
            let col1=document.createElement("td");
            col1.innerText= words[k]["question_word"];
            let col2=document.createElement("td");
            if(words[k]["userSelection"]===words[k]["answer"]){
                col2.innerHTML='<i class="fas fa-check-square"></i>';
            }else{
                col2.innerHTML='<i class="fas fa-times-circle"></i>';
            }
            row.appendChild(col1);
            row.appendChild(col2);
            document.getElementById("report_table").appendChild(row);
        }
        document.getElementById("marks_sec").innerText=number_of_correct;
        document.getElementById("total_m").innerText=number_of_words;
        document.getElementById('i-circle1').innerText=percentage.toString()+"%";
        let deg1=(percentage/100*360)/2;
        degree1=deg1.toString()+"deg";
        fill1=document.getElementsByClassName('fill1');
        full1=document.getElementsByClassName('full1');
        const t1=new TimelineMax();
        t1.fromTo(fill1,1,{transition: "transform",transform:"rotate(0deg)",ease:Power1.easeInOut},{transition: "transform",transform:"rotate("+degree1+")"}).
        fromTo(full1,1,{transition: "transform",transform:"rotate(0deg)",ease:Power1.easeInOut},{transition: "transform",transform:"rotate("+degree1+")"},"-=1");
        
}