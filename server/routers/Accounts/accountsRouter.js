const accountsRouter = require('express').Router();
const accountsController = require('./accountsController');

accountsRouter.route('/')
  .get()
  .post(accountsController.addAccount)
  .put()
  .delete()


module.exports = accountsRouter;