const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./schema.js');

passport.serializeUser(function(user, done) {
  console.log('user id: ', user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('done deserializing...')
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    process.nextTick(function() {
      User.findOne({email, password})
        .then(user => {
          if (!user) { 
            return done(null, false);
          }
          if (user) {
            // todo -- match password
            return done(null, user);
          }
        });
    })
    
  }
))

module.exports = passport;