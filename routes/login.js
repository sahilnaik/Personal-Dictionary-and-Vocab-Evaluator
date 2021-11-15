const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const userData = data.user;
let { ObjectId } = require("mongodb");
router.get("/", async (req, res) => {
  try {
    res.sendFile(path.resolve("static/login.html"));
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
router.post("/", async (req, res) => {
  let loginData = req.body;

  let email = loginData.email;
  let password = loginData.password;

  if (email.length < 1 || password.length < 8) {
    res.status(400).json({ error: "Bad data" });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  try {
    const checkUser = await userData.get(email, password);
    res.status(200).json(checkUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
