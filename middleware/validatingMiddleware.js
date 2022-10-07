const validateCreatePostMiddleware = (req, res, next) => {
  if (!(req.files && req.files.img)) {
    res.redirect("/posts/new");
  }
  next();
};

module.exports = validateCreatePostMiddleware;
