let passwordBox = document.getElementById("password");

let passwordError = document.getElementById("pass-error");

let repeatPasswordBox = document.getElementById("password-repeat");

let emailBox = document.getElementById("email");

let emailError = document.getElementById("email-error");

let firstNameBox = document.getElementById("firstname");

let firstNameError = document.getElementById("firstname-error");

let lastnameBox = document.getElementById("lastname");

let lastNameError = document.getElementById("lastname-error");

let phoneNumberBox = document.getElementById("phonenumber");

let phoneError = document.getElementById("phone-error");
let myForm = document.getElementById("myForm");

let validEmail;
let validPhoneNumber;
let validPassword;
let validFirstName;
let validLastName;
if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let password = passwordBox.value;
    let email = emailBox.value;
    let firstName = firstNameBox.value;
    let lastname = lastnameBox.value;
    let phoneNumber = phoneNumberBox.value;
    let repeatPassword = repeatPasswordBox.value;
    if (!validateEmail(email)) {
      emailBox.classList.add("input-error");
      emailError.style.display = "grid";
      emailError.innerHTML = "Bad email address";
      emailBox.focus();
      validEmail = false;
      return;
    } else {
      emailBox.classList.remove("input-error");
      emailError.style.display = "none";
      validEmail = true;
    }
    if (
      firstName.length < 2 ||
      
      !firstName ||
      !firstName.trim() ||
      !firstName.match(/^[a-zA-Z]+$/)
    ) {
      firstNameBox.classList.add("input-error");

      firstNameError.style.display = "grid";
      firstNameError.innerHTML = "Bad first name";
      firstNameBox.focus();
      validFirstName = false;
      return;
    } else {
      firstNameBox.classList.remove("input-error");
      firstNameError.style.display = "none";
      validFirstName = true;
    }
    if (
      lastname.length < 2 ||
      lastname.length > 20 ||
      !lastname ||
      !lastname.trim() ||
      !lastname.match(/^[a-zA-Z]+$/)
    ) {
      lastnameBox.classList.add("input-error");
      lastNameError.style.display = "grid";
      lastNameError.innerHTML = "Bad last name";
      lastnameBox.focus();
      validLastName = false;
      return;
    } else {
      lastnameBox.classList.remove("input-error");
      lastNameError.style.display = "none";
      validLastName = true;
    }
    if (
      phoneNumber.at(3) !== "-" ||
      phoneNumber.at(7) !== "-" ||
      phoneNumber.length != 12
    ) {
      phoneNumberBox.classList.add("input-error");
      phoneError.style.display = "grid";
      phoneError.innerHTML =
        "Phone number invalid. Valid format: '123-456-7890'";
      phoneNumberBox.focus();
      validPhoneNumber = false;
      return;
    } else {
      phoneNumberBox.classList.remove("input-error");
      phoneError.style.display = "none";
      validPhoneNumber = true;
    }
    const checkForLetters = (phoneNumber) =>
      [...phoneNumber].every((c) => "0123456789-".includes(c));

    if (checkForLetters(phoneNumber) === false) {
      phoneNumberBox.classList.add("input-error");
      phoneError.style.display = "grid";
      phoneError.innerHTML = "Phone number invalid";
      phoneNumberBox.focus();
      validPhoneNumber = false;
      return;
    } else {
      phoneNumberBox.classList.remove("input-error");
      phoneError.style.display = "none";
      validPhoneNumber = true;
    }
    if (password.length < 8) {
      passwordBox.classList.add("input-error");
      passwordError.style.display = "grid";
      passwordError.innerHTML = "Password must be at least 8 characters";
      passwordBox.focus();
      validPassword = false;
      return;
    } else {
      passwordBox.classList.remove("input-error");
      passwordError.style.display = "none";
    }
    if (password != repeatPassword) {
      passwordBox.classList.add("input-error");
      repeatPasswordBox.classList.add("input-error");
      passwordError.style.display = "grid";
      passwordError.innerHTML = "Passwords do not match";
      passwordBox.focus();
      validPassword = false;
      return;
    } else {
      passwordBox.classList.remove("input-error");
      repeatPasswordBox.classList.remove("input-error");
      passwordError.style.display = "none";
      validPassword = true;
    }
    if (
      validEmail &&
      validPhoneNumber &&
      validPassword &&
      validFirstName &&
      validLastName
    ) {
      event.preventDefault();
      myForm.submit();
    }
  });
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
