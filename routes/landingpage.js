const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
  if(req.session.user){
    res.redirect('/dashboard');
  }
  else{
    res.sendFile(path.resolve( "static/landingPage.html" ));
  }
  
});

router.get('/demo', (req, res) => {
  res.sendFile(path.resolve( "static/demo.html" ));
});


module.exports = router;