// base route: /auth
const passport = require('../../config/passport.js');
const authRouter = require('express').Router();
const authController = require('./authController');

authRouter.route('/login')
  .post(
    passport.authenticate('local'),
    authController.logInUser
  )

authRouter.route('/logout')
  .post((req, res) => {
    console.log('TODO --- HANDLE LOG OUT OF USER...', req.body.email);
    res.status(200).end();
  })

authRouter.route('/validate')
  .get(authController.validateRequest);

module.exports = authRouter;