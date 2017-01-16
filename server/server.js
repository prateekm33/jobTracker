const express = require('express');
const app = express();
const session = require('express-session');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
// const MongoStore = require('connect-mongo')(session);
const passport = require('./config/passport');

// config db
const db = require('./config/database').db;
app.use(session({ 
  resave: false,
  saveUninitialized: true,
  secret: 'blah blah blah'
}));

console.log('DIR: ', __dirname);
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morganLogger('tiny'));

// configure passport
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app);

app.listen(3000, () => { console.log('Listening on PORT 3000')})