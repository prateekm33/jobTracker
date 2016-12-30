const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

// configure passport
const passport = require('./config/passport.js');

// config db
const db = require('./config/database').db;

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ 
  resave: true,
  saveUninitialized: true,
  secret: 'blah blah blah'
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app);

app.listen(3000, () => { console.log('Listening on PORT 3000')})