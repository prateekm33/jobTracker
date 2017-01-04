// base route: /accounts

const accountsRouter = require('express').Router();
const accountsController = require('./accountsController');
const { validateRequest } = require('../Utils');


accountsRouter.route('/:user')
  .get(validateRequest, accountsController.getAccount)
  .post(accountsController.addAccount)
  .put(validateRequest, accountsController.updateAccount)
  .delete(validateRequest, accountsController.deleteAccount)

accountsRouter.route('/jobs/:user')
  .get(validateRequest, accountsController.getJobs)
  .post(validateRequest, accountsController.addJobs)
  .put(validateRequest, accountsController.updateJobs)

module.exports = accountsRouter;