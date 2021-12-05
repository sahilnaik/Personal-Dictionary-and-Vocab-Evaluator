window.addEventListener('load', (event) => {
    let firstName=document.getElementById("first_name").innerText;
    let lastName=document.getElementById("last_name").innerText;
    let scram = document.getElementById("scram").innerText;
    
    let name=firstName+" "+lastName;
    document.getElementById("right_name").innerText=name;
    document.getElementById("img_profile").src=`../../public/uploads/${scram}`;
   
});