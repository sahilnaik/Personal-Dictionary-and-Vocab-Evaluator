const wordsRoutes = require('./words');

const constructorMethod = (app) => {
    app.use('/', wordsRoutes);
    
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    
  };
  
  module.exports = constructorMethod;