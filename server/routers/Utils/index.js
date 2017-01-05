module.exports = {
  validateRequest(req, res, next) {
    console.log('VALIDATING USER: ', req.user);
    if (!req.user) return res.json(null);
    console.log('request validated.')
    next()
  }
}