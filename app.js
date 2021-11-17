const connection = require("./config/mongoConnection");
const user = require("./data/user");
const mcq = require("./data/mcq");

const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);
async function create() {
  try {
    const mcqCol = await mcq.create("6192c8b1cec5295a3aa3b2b9");
  } catch (e) {
    console.log(e);
  }
}
create();

// app.listen(3000, () => {
//   console.log("We've now got a server!");
//   console.log("Your routes will be running on http://localhost:3000");
// });
