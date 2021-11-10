const addWordsRoute = require('./addWords');
const flashcardRoute = require('./flashcard');
const mainRoute = require('./main');
const mcqRoute = require('./mcq');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', mainRoute);

  app.use('/flashcard', flashcardRoute);

  app.use('/addWords', addWordsRoute);
  
  app.use('/mcq', mcqRoute);

    app.use('*', (req, res) => {
        
    });
};

module.exports = constructorMethod;