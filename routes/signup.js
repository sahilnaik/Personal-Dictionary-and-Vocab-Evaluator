const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    res.sendFile(path.resolve("static/signup.html"));
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
router.post("/", async (req, res) => {
  let signupData = req.body;
  let firstName = signupData.firstName;
  try {
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
