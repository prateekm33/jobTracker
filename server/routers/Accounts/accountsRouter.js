const accountsRouter = require('express').Router();
const accountsController = require('./accountsController');

accountsRouter.route('/')
  .get()
  .post(accountsController.addAccount)
  .put()
  .delete()

accountsRouter.route('/jobs/:user')
  .get(accountsController.getJobs)
  .post(accountsController.addJob);

module.exports = accountsRouter;