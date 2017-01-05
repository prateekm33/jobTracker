// base route: /accounts

const accountsRouter = require('express').Router();
const accountsController = require('./accountsController');
const { validateRequest } = require('../Utils');

accountsRouter.route('/')
  .post(accountsController.addAccount);
accountsRouter.route('/:user')
  .get(validateRequest, accountsController.getAccount)
  .put(validateRequest, accountsController.updateAccount)
  .delete(validateRequest, accountsController.deleteAccount)

accountsRouter.route('/jobs/:user')
  .get(validateRequest, accountsController.getJobs)
  .post(validateRequest, accountsController.addJobs)
  .put(validateRequest, accountsController.updateJobs)

module.exports = accountsRouter;