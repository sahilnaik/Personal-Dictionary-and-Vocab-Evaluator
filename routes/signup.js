const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
let { ObjectId } = require("mongodb");


router.get("/", async (req, res) => {
  try {
    res.render("user/signup", { layout: "user" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  let signupData = req.body;
  let firstName = signupData.firstname;
  let lastName = signupData.lastname;
  let email = signupData.email;
  let password = signupData.psw;
  let phoneNumber = signupData.phonenumber;
  let confirmPassword = signupData.psw_repeat;
  if (
    firstName.length < 1 ||
    lastName.length < 1 ||
    email.length < 1 ||
    password.length < 8 ||
    confirmPassword.length < 8
  ) {
    //  res.status(400).json({ error: "Bad data" });
    res.status(400).render("user/signup", {
      layout: "user",
      error: "Bad data",
    });
    return;
  }
  if (password !== confirmPassword) {
    //  res.status(400).json({ error: "Passwords do not match" });
    res.status(400).render("user/signup", {
      layout: "user",
      error: "Passwords do not match",
    });
    return;
  }

  if (!validateEmail(email)) {
    //res.status(400).json({ error: "Invalid email" });
    res.status(400).render("user/signup", {
      layout: "user",
      error: "Invalid email",
    });
    return;
  }
  if (
    phoneNumber.at(3) !== "-" ||
    phoneNumber.at(7) !== "-" ||
    phoneNumber.length != 12
  ) {
    //  res.status(400).json({ error: "Invalid phone number" });
    res.status(400).render("user/signup", {
      layout: "user",
      error: "Invalid phone number",
    });
    return;
  }
  const checkForLetters = (phoneNumber) =>
    [...phoneNumber].every((c) => "0123456789-".includes(c));

  if (checkForLetters(phoneNumber) === false) {
    //res.status(400).json({ error: "Invalid phone number" });
    res.status(400).render("user/signup", {
      layout: "user",
      error: "Invalid phone number",
    });
    return;
  }
  try {
    const addUser = await userData.create(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );
    

    res.redirect("./login");
  } catch (error) {
    return res.status(404).render("user/signup", {
      layout: "user",
      error: error,
    });
  }
});
module.exports = router;
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
