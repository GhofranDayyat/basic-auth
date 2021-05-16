'use strict';
const express = require('express');

const mongoose = require('mongoose');


// Prepare the express app
const app = express();

const handleError=require('./middleware/500.js');
const errorNotFound=require('./middleware/404.js');
const routers=require('./auth/router');

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


app.use(routers);


app.use(handleError);
app.use('*',errorNotFound);

function start(port,MONGODB_URL){
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      app.listen(port, () => console.log(`server up ${port}`));
    })
    .catch(e => console.error('Could not start server', e.message));
}

module.exports = {
  app,
  start
};
