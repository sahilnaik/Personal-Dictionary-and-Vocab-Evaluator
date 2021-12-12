window.addEventListener('load', (event) => {
    document.getElementsByClassName("sidebar-add-word")[0].style.backgroundColor="rgb(53, 51, 51)";
 });

 let form=document.getElementById('add-word-form');
 if (form) {
         form.addEventListener("submit", (event) => {
             event.preventDefault();
             console.log("entering..");
             let validateWord=true;
             let validateMeaning=true;
             let validateSynonym=true;
             let validateAntonym=true;
             let validateExample=true;
             let word=document.getElementById('word').value;
             let word_err=document.getElementById('word_err');
             let meaning=document.getElementById('meaning').value;
             let meaning_err=document.getElementById('meaning_err');
             let synonym=document.getElementById('synonym').value;
             let synonym_err=document.getElementById('synonym_err');
             let antonym=document.getElementById('antonym').value;
             let antonym_err=document.getElementById('antonym_err');
             let example=document.getElementById('example').value;
             let example_err=document.getElementById('example_err');
             validateWord=checkWord(word,word_err);
             validateMeaning=checkMeaning(meaning,meaning_err);
             validateSynonym=checkSynonym(synonym,synonym_err);
             validateAntonym=checkAntonym(antonym,antonym_err);
             validateExample=checkExample(example,example_err);

             if(validateWord&&validateMeaning&&validateSynonym&&validateAntonym&&validateExample){
                var delayInMilliseconds = 2000;

                setTimeout(function() {
                  form.submit();
                }, delayInMilliseconds);
                swal({
                    title: "Good job!",
                    text: "Request Submitted!",
                    icon: "success",
                });
             }
     });

     function checkWord(word,word_err){
         if(word.length===0){

                 word_err.style.display="grid";
                    document.getElementById('word').focus();
                 word_err.innerText="Please Enter a valid word";

                 validateWord=false;
                 return validateWord;
             }else{
                 word_err.style.display="none";
                 validateWord=true;
             }
             if(word.match(/\s+/)){
                 word_err.style.display="grid";
                 document.getElementById('word').focus();
                 word_err.innerText="Word consists of spaces. Please Enter a valid word";
                 validateWord=false;
                 return validateWord;
             }else{
                 word_err.style.display="none";
                 validateWord=true;
             }
             
             let i=0;
             let flag=0;
             while(i<word.length){
                 let code = word.charCodeAt(i);
                 if (!(code > 64 && code < 91) &&
                     !(code > 96 && code < 123)&& !(code===32)) {
                         word_err.style.display="grid";
                            document.getElementById('word').focus();
                         word_err.innerText=`Input word ${word} can only contain alphabets!`;
                         validateWord=false;
                         flag=1;
                         return validateWord;
                 }else{
                     i++;
                 }
             }
             if(flag===0){
                 word_err.style.display="none";
                 validateWord=true;
             }
              return validateWord;
 
     }

     function checkMeaning(meaning,meaning_err){
             if(meaning.length===0){
                 meaning_err.style.display="grid";
                    document.getElementById('meaning').focus();
                 meaning_err.innerText="Please Enter a valid meaning";
                 validateMeaning=false;
                 return validateMeaning;
             }else{
                 meaning_err.style.display="none";
                 validateMeaning=true;
             }
             if(meaning.match(/^\s+$/)){
                 meaning_err.style.display="grid";
                 document.getElementById('meaning').focus();
                 meaning_err.innerText="Meaning is full of empty spaces. Please Enter a valid meaning";
                 validateMeaning=false;
                 return validateMeaning;
             }else{
                 meaning_err.style.display="none";
                 validateMeaning=true;
             }
             if(meaning === document.getElementById('word').value || meaning === document.getElementById('synonym').value || meaning === document.getElementById('antonym').value || meaning === document.getElementById('example').value){
                meaning_err.style.display="grid";
                document.getElementById('meaning').focus();
                meaning_err.innerText="Meaning cannot be similar to other attributes";
                validateMeaning=false;
                return validateMeaning;
            }else{
                meaning_err.style.display="none";
                validateMeaning=true;
            }
             
             return validateMeaning;
     }

     function checkSynonym(synonym,synonym_err){
             if(synonym.length===0){
                 synonym_err.style.display="grid";
                 document.getElementById('synonym').focus();
                 synonym_err.innerText="Please Enter a valid synonym";
                 validateSynonym=false;
                 return validateSynonym;
             }else{
                 synonym_err.style.display="none";
                 validateSynonym=true;
             }
             if(synonym.match(/^\s+$/)){
                 synonym_err.style.display="grid";
                 document.getElementById('synonym').focus();
                 synonym_err.innerText="Synonym consist full of empty spaces. Please Enter a valid synonym";
                 validateSynonym=false;
                 return validateSynonym;
             }else{
                 synonym_err.style.display="none";
                 validateSynonym=true;
             }
             if(synonym === document.getElementById('word').value || synonym === document.getElementById('meaning').value || synonym === document.getElementById('antonym').value || synonym === document.getElementById('example').value){
                synonym_err.style.display="grid";
                document.getElementById('synonym').focus();
                synonym_err.innerText="Synonym cannot be similar to other attributes";
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
                            document.getElementById('synonym').focus();
                            synonym_err.innerText=`Input synonym ${synonym} can only have alphabets and comma spaces as separator. \n Multiple synonyms can be entered with comma space as the separator!`;
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
                    document.getElementById('antonym').focus();
                 antonym_err.innerText="Antonym consists of spaces. Please Enter a valid antonym";
                 validateAntonym=false;
                 return validateAntonym;
             }else{
                 antonym_err.style.display="none";
                 validateAntonym=true;
             }
             
            if(antonym === document.getElementById('word').value || antonym === document.getElementById('meaning').value || antonym === document.getElementById('synonym').value || antonym === document.getElementById('example').value){
                antonym_err.style.display="grid";
                   document.getElementById('antonym').focus();
                antonym_err.innerText="Antonym cannot be similar to other attributes";
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
                            document.getElementById('antonym').focus();
                            antonym_err.innerText=`Input antonym ${antonym} can only have alphabets and comma spaces as separator. \n Multiple antonyms can be entered with comma space as the separator!`;
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
                    document.getElementById('example').focus();
                 example_err.innerText="Example is full of empty spaces. Please enter a valid example!";
                 
                 validateExample=false;
                 return validateExample;
             }else{
                 example_err.style.display="none";
                 validateExample=true;
             }
             if(example === document.getElementById('word').value || example === document.getElementById('meaning').value || example === document.getElementById('synonym').value || example === document.getElementById('antonym').value){
                example_err.style.display="grid";
                   document.getElementById('example').focus();
                example_err.innerText="Example cannot be similar to other attributes";
                
                validateExample=false;
                return validateExample;
            }else{
                example_err.style.display="none";
                validateExample=true;
            }
             return validateExample;
     }
 }