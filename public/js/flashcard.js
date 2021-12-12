window.addEventListener('load', (event) => {
    document.getElementsByClassName("sidebar-flashcard")[0].style.backgroundColor="rgb(53, 51, 51)";
});

let wordCount=-1;
let correctCount=0;
let wrongCount=0;
let questions=[];
let meaning=[];
let synonyms=[];
let antonyms=[];
let examples=[];
let word_i=document.getElementsByClassName("word_i");
let meaning_i=document.getElementsByClassName("meaning_i");
let synonyms_i=document.getElementsByClassName("synonyms_i");
let antonyms_i=document.getElementsByClassName("antonyms_i");
let examples_i=document.getElementsByClassName("examples_i");
let flashcardId=document.getElementById("flashcard_id").innerText;

for(let i=0;i<10;i++){
    questions.push(word_i[i].innerHTML);
    meaning.push(meaning_i[i].innerHTML);
    synonyms.push(synonyms_i[i].innerHTML);
    if(antonyms_i[i].innerHTML===""){
        antonyms.push("None provided");
    }
    else{
        antonyms.push(antonyms_i[i].innerHTML);
    }
    if(examples_i[i].innerHTML===""){
        examples.push("None provided");
    }
    else{
    examples.push(examples_i[i].innerHTML);
    }
}

let words=[];
for(let i=0;i<10;i++){
    word["word"]=questions[i];
    word["meaning"]=meaning[i];
    word["synonyms"]=synonyms[i];
    word["antonyms"]=antonyms[i];
    word["example"]=examples[i];
    word["userSelection"]="";
    word["correctOrNot"]="";
    
    words.push(word);
    word={};

}
function startTest(){
    document.getElementById("flashcard-content").style.display="grid";
    changeWord();
    document.getElementById("startFlashcardTest").style.display="none";
}

function changeWord(){
    console.log("inside the fn");
    if(wordCount+1===words.length){
        words[wordCount].userSelection=true;
        correctCount++;
        const card=document.querySelector("#card1");
        const back_card=document.querySelector("#back_card");
        document.getElementById("back_card").style.display="none";
        const t1=new TimelineMax();
        t1.fromTo(card,1,{left: "10%",opacity:"1"},{left:"80%",opacity:"0"});
        t1.fromTo(card,1,{left: "80%",opacity:"0"},{left:"10%",opacity:"1"});
        document.getElementById("submit-button").click();
    }else if(wordCount===-1){
        const card=document.querySelector("#card1");
        const back_card=document.querySelector("#back_card");
        document.getElementById("back_card").style.display="none";
        const t1=new TimelineMax();
        t1.fromTo(card,1,{left: "10%",opacity:"1"},{left:"80%",opacity:"0"});
        let newObj=woord();
        document.getElementById("cardHeader").innerHTML=newObj["queNo"];
        document.getElementById("cardTitle").innerHTML=newObj["word"];
        document.getElementById("cardText").innerHTML=newObj["title"];
        document.getElementById("word").innerHTML=newObj["word"];
        document.getElementById("meaning").innerHTML=newObj["meaning"];
        document.getElementById("synonym").innerHTML=newObj["synonyms"];
        document.getElementById("antonym").innerHTML=newObj["antonyms"];
        document.getElementById("example").innerHTML=newObj["example"];
        document.getElementById("flashcardOptions").innerHTML=newObj["option"];
        t1.fromTo(card,1,{left: "80%",opacity:"0"},{left:"10%",opacity:"1"});
    }
    else{
        words[wordCount].userSelection=true;
        correctCount++;
        const card=document.querySelector("#card1");
        const back_card=document.querySelector("#back_card");
        document.getElementById("back_card").style.display="none";
        const t1=new TimelineMax();
        t1.fromTo(card,1,{left: "10%",opacity:"1"},{left:"80%",opacity:"0"});
        let newObj=woord();
        document.getElementById("cardHeader").innerHTML=newObj["queNo"];
        document.getElementById("cardTitle").innerHTML=newObj["word"];
        document.getElementById("cardText").innerHTML=newObj["title"];
        document.getElementById("word").innerHTML=newObj["word"];
        document.getElementById("meaning").innerHTML=newObj["meaning"];
        document.getElementById("synonym").innerHTML=newObj["synonyms"];
        document.getElementById("antonym").innerHTML=newObj["antonyms"];
        document.getElementById("example").innerHTML=newObj["example"];
        document.getElementById("flashcardOptions").innerHTML=newObj["option"];
        t1.fromTo(card,1,{left: "80%",opacity:"0"},{left:"10%",opacity:"1"});
    }
    
}
function woord(){
    let newObj={};
    wordCount++;
    let queNo=document.getElementById("cardHeader").innerHTML;
    let que=document.getElementById("cardText").innerHTML;
    let options=document.getElementById("flashcardOptions").innerHTML;
    console.log(que);
    newObj["queNo"]=wordCount+1;
    newObj["title"]=que;
    newObj["word"]=words[wordCount].word.toUpperCase();
    newObj["meaning"]=words[wordCount].meaning;
    newObj["synonyms"]=words[wordCount].synonyms;
    newObj["antonyms"]=words[wordCount].antonyms;
    newObj["example"]=words[wordCount].example;
    newObj["option"]=options;
    return newObj;
}

function fadeout(newObj){
    console.log(newObj);
}

function flipCard(){
    wrongCount++;
    const t1=new TimelineMax();
    const front_card=document.querySelector("#front_card");
    const card1=document.querySelector("#card1");
    const card2=document.querySelector("#card2");
    const back_card=document.querySelector("#back_card");
    document.getElementById("front_card").style.display="none";
    t1.fromTo(front_card,1,{transition: "transform",transform:"rotateY(0deg)",display:"grid",opacity:1},{transition: "transform",transform:"rotateY(180deg)",display:"none",opacity:0})
    .fromTo(card1,0,{display:"flex",opacity:1},{display:"none",opacity:0})
    .fromTo(card2,0,{display:"none",opacity:0},{display:"flex",opacity:1})
    .fromTo(back_card,1,{display:"none",opacity:0},{display:"grid",opacity:1});
    document.getElementById("card2").style.display="none";
    // document.getElementById("word").innerHTML;
}

function changeWordBack(){
    const card=document.querySelector("#card1");
    const back_card=document.querySelector("#back_card");
    document.getElementById("back_card").style.display="none";
    document.getElementById("card2").style.display="none";
    document.getElementById("card1").style.display="grid";
    document.getElementById("front_card").style.display="grid";
    document.getElementById("front_card").style.opacity=1;
    document.getElementById("front_card").style.transition="transform";
    document.getElementById("front_card").style.transform="rotateY(0deg)";
    const t1=new TimelineMax();
    t1.fromTo(card,1,{left: "10%",opacity:"1"},{left:"80%",opacity:"0"});
    if(wordCount+1===words.length){
        console.log(wordCount+1);
        t1.fromTo(card,1,{left: "80%",opacity:"0"},{left:"10%",opacity:"1"});
        document.getElementById("submit-button").click();
    }else{
        words[wordCount+1].userSelection=false;
        let newObj=woord();
        document.getElementById("cardHeader").innerHTML=newObj["queNo"];
        document.getElementById("cardTitle").innerHTML=newObj["word"];
        document.getElementById("cardText").innerHTML=newObj["title"];
        document.getElementById("word").innerHTML=newObj["word"].toUpperCase();
        document.getElementById("meaning").innerHTML=newObj["meaning"];
        document.getElementById("synonym").innerHTML=newObj["synonyms"];
        document.getElementById("antonym").innerHTML=newObj["antonyms"];
        document.getElementById("example").innerHTML=newObj["example"];
        document.getElementById("flashcardOptions").innerHTML=newObj["option"];
        t1.fromTo(card,1,{left: "80%",opacity:"0"},{left:"10%",opacity:"1"});
    }
    
    
}
function eval(){
let percentage=Math.round(correctCount/words.length*100);
console.log("Marks secured: "+correctCount+" out of "+words.length);
console.log("Percentage of Marks secured: "+percentage);
triggerGraphs(correctCount,words.length,percentage);
let session={};
let temp={};
temp["word"]=words[0].word;
temp["meaning"]=words[0].meaning;
temp["synonyms"]=words[0].synonyms;
temp["antonyms"]=words[0].antonyms;
temp["example"]=words[0].example;
temp["userSelection"]=words[0].userSelection;

words[0]=temp;
console.log(words[0]);
session["words"]=words;

session["number_of_correct"]=correctCount;
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
console.log(flashcardId);
console.log("entered ajax");
$.ajax({

url: '/flashcard/flashcardsubmit',
type: 'POST',
data: {
    flashcardData: data.words,
    number_of_correct: data.number_of_correct,
    id:flashcardId
},

success: function(msg) {
    alert('Email Sent');
}               
});
});
})(jQuery);



function triggerGraphs(number_of_correct,number_of_words,percentage){
console.log("entered");
document.getElementById("flashcard-content").style.display="none";
document.getElementById("result_box").style.display="grid";
for(let k=0;k<words.length;k++){
    let row=document.createElement("tr");
    let col1=document.createElement("td");
    col1.innerText= words[k]["word"];
    let col2=document.createElement("td");
    if(words[k]["userSelection"]===true){
        col2.innerHTML='<i class="fas fa-check-square"></i>';
    }else{
        col2.innerHTML='<i class="fas fa-times-circle"></i>';
    }
    row.appendChild(col1);
    row.appendChild(col2);
    document.getElementById("report_table").appendChild(row);
}
document.getElementById("marks_sec").innerText=correctCount;
document.getElementById("total_m").innerText=words.length;
document.getElementById('i-circle1').innerText=percentage.toString()+"%";
let deg1=(percentage/100*360)/2;
degree1=deg1.toString()+"deg";
fill1=document.getElementsByClassName('fill1');
full1=document.getElementsByClassName('full1');
const t1=new TimelineMax();
t1.fromTo(fill1,1,{transition: "transform",transform:"rotate(0deg)",ease:Power1.easeInOut},{transition: "transform",transform:"rotate("+degree1+")"}).
fromTo(full1,1,{transition: "transform",transform:"rotate(0deg)",ease:Power1.easeInOut},{transition: "transform",transform:"rotate("+degree1+")"},"-=1");

}