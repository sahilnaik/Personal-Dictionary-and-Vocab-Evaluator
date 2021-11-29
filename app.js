const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const { engine } = require('express-handlebars');
const session = require('express-session');
const multer = require('multer');
const { users } = require('./data');
const updatePicture = require('./data/user');

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
    
  })
);

// MIDDLEWARES STARTS

//-------Multer Middleware for Image Upload---------//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

app.post('/profile-upload-single', upload.single('profile-file'), async function (req, res, next) {
  profilePicture = req.file.originalname;
  try {
    const updateProfilePicture = await updatePicture.updatePicture(req.session.user._id, profilePicture);
    req.session.user.profilePicture = profilePicture;
    res.redirect('/profile');
  } catch (error) {
    console.log(error);
  }
    
  
  
})
// MIDDLEWARES ENDS

configRoutes(app);

app.use((req, res, next) => {
  date = new Date();
  console.log(
    `[${date.toUTCString()}]:\t${req.method}\t${req.originalUrl}\t\t${
      req.session.user ? "(Authenticated User)" : "(Non-Authenticated User)"
    }`
  );
  next();
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

