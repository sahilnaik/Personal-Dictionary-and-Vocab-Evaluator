window.addEventListener('load', (event) => {
    let firstName=document.getElementById("first_name").innerText;
    let lastName=document.getElementById("last_name").innerText;
    let scram = document.getElementById("scram").innerText;
    console.log('page is fully loaded');
    let name=firstName+" "+lastName;
    document.getElementById("right_name").innerText=name;
    document.getElementById("p_name").innerText=name;
    
    document.getElementById("img_profile").src=`../../public/uploads/${scram}`;
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