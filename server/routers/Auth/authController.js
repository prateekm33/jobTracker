const passport = require('../../config/passport.js');
const {User} = require('../../config/schema.js');

module.exports = {

  validateRequest(req, res, next) {
    res.json(req.user.email);
  },

  logInUser(req, res, next) {
    if (req.user) return res.status(200).json(req.user.email);
    else return res.status(401).json(null);
  },

  logOutUser(req, res, next) {
    if (!req.user) return res.status(401).end();

    req.logout();
    res.status(200).end();
  }
}