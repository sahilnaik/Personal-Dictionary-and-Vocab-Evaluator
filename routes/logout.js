const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
let { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
    req.session.destroy()
    res.render("user/logout")
})

module.exports = router;
