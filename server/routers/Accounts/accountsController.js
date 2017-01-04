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

  },

  getJobs(req, res) {
    const user = req.params.user;
    User.findOne({email: user})
      .then(user => {
        if (user) {
          res.send(user.jobs);
        } else {
          res.status(400).end();
        }
      })
  },

  addJob(req, res) {
    const job = req.body.job;
    const user = req.params.user;
    User.update({email: user}, { $pushAll: {jobs: job} }).
      then((r, e) => {
        res.end();
      })
  }
}