const connection = require("./config/mongoConnection");
const user = require("./data/user");
const mcq = require("./data/mcq");
const word = require("./data/words");

const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

// app.get("/", function (request, response) {
//   response.sendFile(path.resolve("views/users/signup.html"));
// });

// app.use("*", (request, response) => {
//   response.status(404).json({ error: "Route not found" });
// });

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
