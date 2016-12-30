// base route: /auth

const authRouter = require('express').Router();
const authController = require('./authController');
const passport = require('../../config/passport.js');


function authPassport(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) return res.status(400).end();

    return res.status(200).end();

  })(req, res, next);
}

authRouter.route('/login')
  .post(
    authPassport,
    authController.validateUser
  )

authRouter.route('/logout')
  .post((req, res) => {
    console.log('TODO --- HANDLE LOG OUT OF USER...', req.body.email);
    res.status(200).end();
  })

module.exports = authRouter;