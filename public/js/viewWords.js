// (function($){

//     $(document).ready(function () {
//         console.log(wordList)
//     })

// })(window.jquery)


    window.addEventListener('load', (event) => {
        document.getElementsByClassName("sidebar-word")[0].style.backgroundColor="rgb(53, 51, 51)";
        let total_no_of_words=100;
        let words_learnt=20;
        let percentage=words_learnt/total_no_of_words*100;
        document.getElementById("pbar").style.width=percentage+"%";
        document.getElementById("perc").innerText=percentage+"%";
        document.getElementById("wordCount").innerText=words_learnt;
        document.getElementById("wordTotal").innerText=total_no_of_words;
    });

    let selection="";
    let wordsList=[];
    let meaningsList=[];
    let synonymsList=[];
    let antonymsList=[];
    let examplesList=[];
    
    let word_i=document.getElementsByClassName("word_i");
    let meaning_i=document.getElementsByClassName("meaning_i");
    let synonyms_i=document.getElementsByClassName("synonyms_i");
    let antonyms_i=document.getElementsByClassName("antonyms_i");
    let examples_i=document.getElementsByClassName("examples_i");

    console.log(word_i.length);
    for(let i=0;i<word_i.length;i++){
        wordsList.push(word_i[i].innerHTML);
        meaningsList.push(meaning_i[i].innerHTML);
        synonymsList.push(synonyms_i[i].innerHTML);
        antonymsList.push(antonyms_i[i].innerHTML);
        examplesList.push(examples_i[i].innerHTML);
    }
    let wordList=[];
    let finalList=[];
    for(let i=0;i<wordsList.length;i++){
        word["word"]=wordsList[i];
        word["meaning"]=meaningsList[i];
        word["synonyms"]=synonymsList[i].split(", ");
        word["antonyms"]=antonymsList[i].split(", ");
        word["example"]=examplesList[i].split(", ");        
        wordList.push(word);
        word={};
                
    }
    wordList.map((obj)=>{
        finalList.push(obj["word"]);
    });
    
    const inputField = document.querySelector('.chosen-value');
    const dropdown = document.querySelector('.value-list');
    let elementList=[];
    finalList.map((ele)=>{
        let element=document.createElement("li");
        let text=document.createTextNode(ele);
        element.appendChild(text);
        dropdown.appendChild(element);
    });

    const dropdownArray = [... document.querySelectorAll('li')];
    console.log(typeof dropdownArray)
    dropdown.classList.add('open');
    inputField.focus();
    let valueArray = [];
    dropdownArray.forEach(item => {
    valueArray.push(item.textContent);
    });

    const closeDropdown = () => {
    dropdown.classList.remove('open');
    }

    inputField.addEventListener('input', () => {
    dropdown.classList.add('open');
    let inputValue = inputField.value.toLowerCase();
    let valueSubstring;
    if (inputValue.length > 0) {
        for (let j = 0; j < valueArray.length; j++) {
        if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
            dropdownArray[j].classList.add('closed');
        } else {
            dropdownArray[j].classList.remove('closed');
        }
        }
    } else {
        for (let i = 0; i < dropdownArray.length; i++) {
        dropdownArray[i].classList.remove('closed');
        }
    }
    });

    dropdownArray.forEach(item => {
    item.addEventListener('click', (evt) => {
        inputField.value = item.textContent;
        selection=item.textContent;
        elementReturn(selection);
        dropdownArray.forEach(dropdown => {
        dropdown.classList.add('closed');
        });
    });
    })

    inputField.addEventListener('focus', () => {
    inputField.placeholder = 'Type to filter';
    dropdown.classList.add('open');
    dropdownArray.forEach(dropdown => {
        dropdown.classList.remove('closed');
    });
    });

    inputField.addEventListener('blur', () => {
    inputField.placeholder = 'Select Word';
    dropdown.classList.remove('open');
    });

    document.addEventListener('click', (evt) => {
    const isDropdown = dropdown.contains(evt.target);
    const isInput = inputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdown.classList.remove('open');
    }
    });

    function elementReturn(selection){
        document.getElementById("meaning_err").innerText="";
        document.getElementById("synonym_err").innerText="";
        document.getElementById("antonym_err").innerText="";
        document.getElementById("example_err").innerText="";

        document.getElementById("details-form").style.display="grid";
        document.getElementById("word").innerText=selection.toUpperCase();
        let meaning,synonyms,antonyms,example="";
        wordList.map((obj)=>{
            if(obj["word"]===selection){
                meaning=obj["meaning"];
                synonyms=obj["synonyms"];
                antonyms=obj["antonyms"];
                example=obj["example"];
            }
        });
        let synonymsString="";
        let i=0;
        while(i<synonyms.length-1){
            synonymsString+=synonyms[i]+", ";
            i++;
        }
        synonymsString+=synonyms[synonyms.length-1];

        let antonymsString="";
        i=0;
        while(i<antonyms.length-1){
            antonymsString+=antonyms[i]+", ";
            i++;
        }
        antonymsString+=antonyms[antonyms.length-1];

        let examplesString="";
        i=0;
        while(i<example.length-1){
            examplesString+=example[i]+". ";
            i++;
        }
        examplesString+=example[example.length-1];

        document.getElementById("meaning").innerHTML=meaning;
        document.getElementById("synonyms").innerText=synonymsString;
        document.getElementById("antonyms").innerText=antonymsString;
        document.getElementById("example").innerText=examplesString;
    }

    detailsForm=document.getElementById("details-form");
    var word1,synonym1,antonym1,example1="";
    detailsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('wordinput').value=document.getElementById("word").innerText;
        document.getElementById("meaninginput").value=document.getElementById("meaning").innerText;
        document.getElementById("synonymsinput").value=document.getElementById("synonyms").innerText;
        document.getElementById("antonymsinput").value=document.getElementById("antonyms").innerText;
        document.getElementById("exampleinput").value=document.getElementById("example").innerText;
        let validateWord=true;
        let validateMeaning=true;
        let validateSynonym=true;
        let validateAntonym=true;
        let validateExample=true;
        let word=document.getElementById('wordinput').value;
        let meaning=document.getElementById('meaninginput').value;
        let meaning_err=document.getElementById('meaning_err');
        let synonym=document.getElementById('synonymsinput').value;
        let synonym_err=document.getElementById('synonym_err');
        let antonym=document.getElementById('antonymsinput').value;
        let antonym_err=document.getElementById('antonym_err');
        let example=document.getElementById('exampleinput').value;
        let example_err=document.getElementById('example_err');
        validateMeaning=checkMeaning(meaning,meaning_err);
        validateSynonym=checkSynonym(synonym,synonym_err);
        validateAntonym=checkAntonym(antonym,antonym_err);
        validateExample=checkExample(example,example_err);
        if(validateMeaning&&validateSynonym&&validateAntonym&&validateExample){
                detailsForm.submit();
        }
        

        function checkSynonym(synonym,synonym_err){
             if(synonym.length===0){
                 synonym_err.style.display="grid";
                 synonym_err.innerText="Please Enter a valid synonym";
                 validateSynonym=false;
                 return validateSynonym;
             }else{
                 synonym_err.style.display="none";
                 validateSynonym=true;
             }
             if(synonym.match(/^\s+$/)){
                 synonym_err.style.display="grid";
                 synonym_err.innerText="Synonym consist full of empty spaces. Please Enter a valid synonym";
                 validateSynonym=false;
                 return validateSynonym;
             }else{
                 synonym_err.style.display="none";
                 validateSynonym=true;
             }
             synonymList=synonym.split(', ');
             j=0;
             flag=0;
             let synonymLength = synonymList.length
             for (let i = 0; i < synonymLength; i++) {
                eachSynonym=synonymList[i];
                while(j<eachSynonym.length){
                    let code = eachSynonym.charCodeAt(j);
                    if (!(code > 64 && code < 91) &&
                        !(code > 96 && code < 123)) {
                            synonym_err.style.display="grid";
                            synonym_err.innerText=`Input synonym ${synonym} can only have alphabets and comma spaces as separator. Multiple synonyms can be entered with comma space as the separator!`;
                            validateSynonym=false;
                            flag=1;
                            return validateSynonym;
                    }else{
                        j++;
                    }
                }
            }

             if(flag===1){
                 synonym_err.style.display="none";
                 validateSynonym=true;
             }
             return validateSynonym;
     }

     function checkAntonym(antonym,antonym_err){
             if(antonym.length===0){
                 validateAntonym=true;
                 return validateAntonym;
             }else{
                 antonym_err.style.display="none";
                 validateAntonym=true;
             }
             if(antonym.match(/^\s+$/)){
                 antonym_err.style.display="grid";
                 antonym_err.innerText="Antonym consists of spaces. Please Enter a valid antonym";
                 validateAntonym=false;
                 return validateAntonym;
             }else{
                 antonym_err.style.display="none";
                 validateAntonym=true;
             }
             antonymList=antonym.split(', ');
             j=0;
             flag=0;
             let antonymLength = antonymList.length
             for (let i = 0; i < antonymLength; i++) {
                eachAntonym=antonymList[i];
                while(j<eachAntonym.length){
                    let code = eachAntonym.charCodeAt(j);
                    if (!(code > 64 && code < 91) &&
                        !(code > 96 && code < 123)) {
                            antonym_err.style.display="grid";
                            antonym_err.innerText=`Input antonym ${antonym} can only have alphabets and comma spaces as separator. Multiple antonyms can be entered with comma space as the separator!`;
                            validateAntonym=false;
                            flag=1;
                            return validateAntonym;
                    }else{
                        j++;
                    }
                }
            }

             if(flag===1){
                 antonym_err.style.display="none";
                 validateAntonym=true;
             }
              return validateAntonym;
     }

        function checkExample(example,example_err){
                if(example.length===0){
                    validateExample=true;
                    return validateExample;
                }else{
                    example_err.style.display="none";
                    validateExample=true;
                }
                if(example.match(/^\s+$/)){
                    example_err.style.display="grid";
                    example_err.innerText="Example is full of empty spaces. Please enter a valid example!";
                    validateExample=false;
                    return validateExample;
                }else{
                    example_err.style.display="none";
                    validateExample=true;
                }
                i=0;
                flag=0;
                while(i<example.length){
                    let code = example.charCodeAt(i);
                    if (!(code > 64 && code < 91) &&
                        !(code > 96 && code < 123)&& !(code===44)&& !(code===32)&& !(code===46)) {
                            example_err.style.display="grid";
                            example_err.innerText=`Input example ${example} can only contain alphabets,commas and space! Multiple examples can be entered with commas as the separator.`;
                            validateExample=false;
                            flag=1;
                            return validateExample;
                    }else{
                        i++;
                    }
                }

                if(flag===1){
                    example_err.style.display="none";
                    validateExample=true;
                }
                return validateExample;
            }
    });
