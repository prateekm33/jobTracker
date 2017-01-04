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
    if (req.user.email !== req.params.user) return res.status(401).end();

    res.json(req.user);
  },

  deleteAccount(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    User.remove({email: req.user.email, password: req.user.password})
      .then(result => {
        console.log('REMOVED RESULT: ', result);
        res.status(200).end();
      });
  },

  updateAccount(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    // TODO -- UPDATE ACCOUNT DETAILS
    User.findOne({email: req.user.email, password: req.user.password})
      .then(user => {
        if (!user) return res.status(404).end();
        console.log('UPDATING USER : ', user);
        user.update(req.body.options).then(result => {
          console.log('UPDATE RESULT: ', result)
          res.status(200).end();
        })
      })
  },






  getJobs(req, res) {
    const user = req.params.user;
    if (req.user.email !== user) return res.status(404).end();
    
    User.findOne({email: user})
      .then(user => {
        if (user) {
          res.send(user.jobs);
        } else {
          res.send(null);
        }
      })
  },

  addJobs(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    const jobs = req.body.jobs;
    const user = req.params.user;
    User.update({email: user}, { $pushAll: {jobs: jobs} }).
      then((r, e) => {
        !e && res.status(200).end();
        e && res.status(400).end();
      })
  },

  updateJobs(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    const jobs = req.body.jobs;
    User.update({email: req.user.email, password: req.user.password}, {jobs: jobs})
      .then((r,e) => {
        !e && res.status(200).end();
        e && res.status(400).end();
      })
  }
}