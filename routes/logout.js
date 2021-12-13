const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const userData = data.users;
let { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
    try{
        req.session.destroy();
        return res.render("user/logout", { layout: "user" });
    }    
    catch (e) {
        return res.status(500).render('httpErrors/error', {code:'500', description: e});
      }
})

module.exports = router;
