const passport = require('../../config/passport.js');
const {User} = require('../../config/schema.js');

module.exports = {

  validateRequest(req, res, next) {
    const user = req.session.user;
    if (!user) return res.json(null);
    
    User.findOne({email: user.email, password: user.password})
      .then(u => { res.json(u.email); })
  },

  logInUser(req, res, next) {
    if (req.user) {
      req.session.user = req.user;
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  }
}