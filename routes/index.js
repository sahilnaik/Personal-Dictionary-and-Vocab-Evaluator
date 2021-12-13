const wordsRoutes = require('./words');
const addWordsRoute = require('./addWords');
const viewWordsRoute = require('./viewWords');
const flashcardRoute = require('./flashcard');
const mainRoute = require('./main');
const mcqRoute = require('./mcq');
const profileRoute = require('./profile');
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const mcqsubmitRoutes = require('./mcqsubmit');
const logoutRoutes = require("./logout")
const landingpageRoutes = require('./landingpage');
const feedbackRoutes = require('./feedback');
var path = require('path');


const constructorMethod = (app) => {
    app.use('/', landingpageRoutes);

    app.use('/dashboard', mainRoute);    
    
    app.use('/login', loginRoutes);

    app.use("/logout", logoutRoutes)

    app.use('/flashcard', flashcardRoute);

    app.use('/addWords', addWordsRoute);
    
    app.use('/mcq', mcqRoute);

    app.use('/profile', profileRoute);

    app.use('/viewWords', viewWordsRoute);

    app.use('/words', wordsRoutes);

    app.use('/signup', signupRoutes);
    
    app.use('/mcqsubmit', mcqsubmitRoutes);

    app.use('/feedback', feedbackRoutes);

    
    app.use('*', (req, res) => {
        
        return res.status(404).sendFile(path.resolve("static/errorPage.html"));
       
    });
    
  };
  
  module.exports = constructorMethod;