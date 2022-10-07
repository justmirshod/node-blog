const Post = require("../models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "userName"
  );
  res.render("post", { post });
};
