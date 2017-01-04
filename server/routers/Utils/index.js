module.exports = {
  validateRequest(req, res, next) {
    if (!req.user) return res.json(null);
    next()
  }
}