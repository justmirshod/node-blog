const Post = require("../models/Post");
const path = require("path");

module.exports = (req, res) => {
  const { img } = req.files;
  img.mv(path.resolve(__dirname, "..", "public/posts", img.name), (err) => {
    if (err) throw err;
    Post.create(
      { ...req.body, img: img.name, author: req.session.userId },
      (err, post) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });
};
