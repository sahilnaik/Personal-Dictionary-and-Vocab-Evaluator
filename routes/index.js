const createWordsRoute = require('./createWords');
const addWordsRoutes = require('./addWords');

const constructorMethod = (app) => {
    app.use('/signup', createWordsRoute);
    app.use('/addWord', addWordsRoutes);
    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
    
  };
  
  module.exports = constructorMethod;