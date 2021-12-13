let passwordError = document.getElementById("password-error");

let emailError = document.getElementById("email-error");
let form = document.getElementById("myForm");
let passwordBox = document.getElementById("password");
let emailBox = document.getElementById("email");
let validEmail;
let validPassword;
if (form) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let password = passwordBox.value;
    let email = emailBox.value;
    if (!validateEmail(email)) {
      emailBox.classList.add("input-error");
      emailError.style.display = "grid";
      emailError.innerHTML = "Bad email address";
      emailBox.focus();
      validEmail = false;
    } else {
      emailBox.classList.remove("input-error");
      emailError.style.display = "none";
      validEmail = true;
    }

    if (password.length < 8) {
      passwordBox.classList.add("input-error");
      passwordError.style.display = "grid";
      passwordError.innerHTML = "Password must be at least 8 characters";
      passwordBox.focus();
      validPassword = false;
    } else {
      passwordBox.classList.remove("input-error");
      passwordError.style.display = "none";
      validPassword = true;
    }
    if (validEmail && validPassword) {
      form.submit();
    }
  });
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
