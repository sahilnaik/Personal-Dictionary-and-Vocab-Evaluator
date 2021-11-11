function signup() {
  let password = document.getElementById("password").value;
  let passwordError = document.getElementById("pass-error");
  let emailError = document.getElementById("email-error");
  let email = document.getElementById("email").value;
  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let phone = document.getElementById("phonenumber").value;
  let repeatPassword = document.getElementById("password-repeat").value;
  if (password != repeatPassword) {
    passwordError.style.display = "grid";
    passwordError.innerHTML = "Passwords do not match";
    return;
  }

  if (!validateEmail(email)) {
    emailError.style.display = "grid";
    emailError.innerHTML = "Bad email address";
    return;
  }
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
