const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const { engine } = require('express-handlebars');
const session = require('express-session');
const multer = require('multer');
const { users } = require('./data');
const updatePicture = require('./data/user');
const res = require('express/lib/response');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
  })
);

// MIDDLEWARES STARTS

//-------Multer Middleware for Image Upload---------//


app.use("/profile-upload-single", (req, res, next) => {
  if (req.method == "GET") {
    return  res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(' ').join('-'))
  }
})
var upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      let error = "Error"
      return error
    }
  } 
})

app.post('/profile-upload-single', result = upload.single('profile-file'), async function (req, res, next) {
  try {
    if (result === "Error") {
      throw 'Only .png, .jpg and .jpeg format allowed!'
    }
    profilePicture = req.file.originalname;
    const updateProfilePicture = await updatePicture.updatePicture(req.session.user._id, profilePicture);
    req.session.user.profilePicture = profilePicture;
    return res.redirect('/profile');
  } catch (error) {
    console.log(error);
    res.status(401).redirect('/profile')
    return
  }
})

// Authenticated User Routes Starts
app.get(`/words`, (req, res, next) => {
  // if (req.method == "GET") {
    return  res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  // }
  next()
})

app.get(`/words/addWord`, (req, res, next) => {
  // if (req.method == "GET") {
    return  res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  // }
  next()
})

app.get(`/words/:id/editWord`, (req, res, next) => {
  // if (req.method == "GET") {
    return  res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  // }
  next()
})

app.get("/", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard") //IT should actually be /dashboard
  }
  next()
})

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard") //IT should actually be /dashboard
  }
  next()
})


app.use("/signup", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard") //IT should actually be /dashboard
  }
  next()
})


// Authenticated User Routes Ends

// Unauthenticated User Routes Starts

app.use("/addWords", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/flashcard", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/mcq", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/profile", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/viewWords", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/mcqsubmit", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/words", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

app.use("/feedback", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('httpErrors/error', {layout: "errorPage", code: 403, description: "Forbidden", title: "403: Forbidden"})
  }
  next()
})

// Unauthenticated User Routes Starts

// MIDDLEWARES ENDS

configRoutes(app);

const PORT = process.env.PORT ||5000;
 
// Executing the server on given port number

app.listen(PORT, () => {
  console.log("We've now got a server!");

});
