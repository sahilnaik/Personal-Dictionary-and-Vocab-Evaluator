const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
let { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
    try{
        req.session.destroy();
        res.render("user/logout", { layout: "user" });
    }    
    catch (e) {
        res.status(500).json({ error: e });
      }
})

module.exports = router;
