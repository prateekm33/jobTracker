const passport = require('../../config/passport.js');
const { User } = require('../../config/schema.js');

module.exports = {
  addAccount(req, res) {
    const newUser = new User(req.body);
    newUser.save().then(user => {
      res.status(201).json(user);
    }).catch(e => { res.status(400).send(e) });
  },

  getAccount(req, res) {

  }
}