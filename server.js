'use strict';
const cors = require('cors');
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const session     = require('express-session');
const mongo       = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectID;
const passport    = require('passport');
const LocalStrategy = require('passport-local');
const dotenv      = require('dotenv').config();
const bcrypt      = require('bcrypt');
const routes = require('./routes.js');
const auth = require('./auth.js');

const app = express();

fccTesting(app); //For FCC testing purposes
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug')





mongo.connect(process.env.DATABASE, (err, db) => {
  if(err) {
      console.log('Database error: ' + err);
  } else {
      console.log('Successful database connection');

      auth(app, db);

      routes(app, db);

      app.listen(process.env.PORT || 3000, () => {
        console.log("Listening on port " + process.env.PORT);
      });

}});


var listener = app.listen(8888, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
