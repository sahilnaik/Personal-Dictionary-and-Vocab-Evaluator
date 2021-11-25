const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
let { ObjectId } = require("mongodb");
router.get("/", async (req, res) => {
  try {
    res.render("user/login", { layout: "user" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
router.post("/", async (req, res) => {
  let loginData = req.body;

  let email = loginData.email;
  let password = loginData.password;

  if (email.length < 1 || password.length < 8) {
    res.status(400).render("user/login", {
      layout: "user",
      error: "Bad data",
    });
    return;
  }

  if (!validateEmail(email)) {
    res.status(404).render("user/login", {
      layout: "user",
      error: "Invalid email id",
    });
    return;
  }

  try {
    const checkUser = await userData.get(email, password);
    if (checkUser) {
      req.session.user = { email: checkUser.email, firstName: checkUser.firstName, lastName: checkUser.lastName, _id: checkUser._id, profilePicture: checkUser.profilePicture };
      return res.redirect("./");
    }
    else {
      res.status(500).json({ error: "Internal Server error" });
      return;
    }
    
  } catch (error) {
    return res.status(404).render("user/login", {
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
