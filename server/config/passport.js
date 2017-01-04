const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./schema.js');


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
      User.findOne({email, password})
        .then(user => {
          if (!user) { 
            console.log('cant auth user. no user found....')
            return done(null, false);
          }
          if (user) {
            // todo -- match password
            console.log('found user in local database: ', user);
            return done(null, user);
          }
        }); 
    }
  ))

module.exports = passport;