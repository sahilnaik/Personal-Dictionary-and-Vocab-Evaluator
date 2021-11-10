const connection = require("./config/mongoConnection");
const user = require("./data/user");
const mcq = require("./data/mcq");
const word = require("./data/words");

const express = require("express");
const path = require("path");

const app = express();
app.use("/public", express.static(__dirname + "/public"));
app.set("views", express.static(__dirname + "/views"));

app.get("/", function (request, response) {
  response.sendFile(path.resolve("views/users/signup.html"));
});

app.use("*", (request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
