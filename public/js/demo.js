let wordindex=-1;
let words=[];
let number_of_correct=0;





function startTest(){
    document.getElementById("startMCQTest").style.display="none";
    document.getElementById("submit-button").style.display="none";
    document.getElementById("prev-button").style.display="none"
    document.getElementById("result_box").style.display="none";
 //   document.getElementById("mcq_box").classList.remove("hidden");
    initialize();
    wordindex++;
    que("next");
    document.getElementById("mcq_box").style.display="grid";
}

function initialize(){
    let session={};
    let word={};
    word["Question word"]="Dispel";
    word["options"]=["Disband","Allurement","Adulation","Blandish"];
    word["answer"]="Disband";
    word["userSelection"]="";
    word["correctOrNot"]="";
    words.push(word);
    let word1={};
    word1["Question word"]="Sad";
    word1["options"]=["Sorrow","Happy","Pleasant","Determined"];
    word1["answer"]="Sorrow";
    word1["userSelection"]="";
    word1["correctOrNot"]="";
    words.push(word1);
    let word2={};
    word2["Question word"]="Focused";
    word2["options"]=["Sorrow","Happy","Determined","Pleasant"];
    word2["answer"]="Determined";
    word2["userSelection"]="";
    word2["correctOrNot"]="";
    words.push(word2);
    session["words"]=words;
}

function que(page){
    if(page==="next"){
        let word3=words[wordindex];
        document.getElementById("word").innerHTML=word3["Question word"];
        let options=word3["options"];
        document.getElementById("label_option1").innerHTML=options[0];
        document.getElementById("label_option2").innerHTML=options[1];
        document.getElementById("label_option3").innerHTML=options[2];
        document.getElementById("label_option4").innerHTML=options[3];
    }
    else if(page==="prev"){
        let word3=words[wordindex];
        document.getElementById("word").innerHTML=word3["Question word"];
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
           
           words[wordindex]["userSelection"]=document.getElementById("label_"+ele[i].id).innerText;
        }
    }
    
}

function next(){
    wordindex++;
    if(wordindex==2){
        document.getElementById("submit-button").style.display="flex";
        document.getElementById("next-button").style.display="none";
    }
    else if(wordindex>0){

        document.getElementById("prev-button").style.display="flex";
    }

    que("next");
    var ele = document.getElementsByName("mcq_ans");
    for(var i=0;i<ele.length;i++){
        
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

    if(wordindex==2){
        document.getElementById("submit-button").style.display="flex";
    }
    else if(wordindex>0){
        document.getElementById("submit-button").style.display="none";
        document.getElementById("next-button").style.display="flex"
    }
    else
    {
        document.getElementById("prev-button").style.display="none"
    }

    var ele = document.getElementsByName("mcq_ans");
    for(var i=0;i<ele.length;i++){
        
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
            words[k]["correctOrNot"]="true";
            number_of_correct++;
        }else{
            words[k]["correctOrNot"]="false";
        }   
    }

  //  var resultcontainer= document.getElementById("resultcontainer");
    var result=document.getElementById("result")
    result.innerHTML=Math.round(number_of_correct/words.length*100);

    var mcq_box=document.getElementById("mcq_box");

    mcq_box.style.display="none"

   // resultcontainer.style.display='flex'


    console.log(words);
    console.log(number_of_correct);
    let percentage=number_of_correct/words.length*100;
    console.log("Marks secured: "+number_of_correct+" out of "+words.length);
    console.log("Percentage of Marks secured: "+percentage);


     triggerGraphs();
}       



function triggerGraphs(){
    console.log("entered");
    document.getElementById("mcq_box").style.display="none";
    document.getElementById("result_box").style.display="grid";
    for(let k=0;k<words.length;k++){
        let row=document.createElement("tr");
        let col1=document.createElement("td");
        col1.innerText= words[k]["Question word"];
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
}