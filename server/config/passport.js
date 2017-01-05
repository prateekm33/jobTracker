const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./schema.js');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('passport password: ', password);
    User.findOne({email})
      .then(user => {
        if (!user) { 
          console.log('cant auth user. no user found....')
          return done(null, false);
        }
        if (user) {
          // todo -- match password
          bcrypt.compare(password, user.password, (err, equal) => {
            if (err || !equal) {
              console.log('passwords do not match')
              return done(null, false);
            } 
            else {
              console.log('found user in local database: ', user);
              return done(null, user);
            }
          });
        }
      }); 
  }
))

module.exports = passport;