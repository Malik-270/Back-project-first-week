const Comments = require("../models/Comment.model");

module.exports.commentsController = {
  deleteComments: async (req, res) => {
    try {
      await Comments.findByIdAndDelete(req.params.id);

      return res.json("deleted");
    } catch (e) {
      return res.status(401).json(e.message);
    }
  },

  addComments: async (req, res) => {
    const { text, newsId, userId } = req.body

    try {
      const comments = await Comments.create({
        text,
        userId,
        newsId,
      }) 

      const newComment = await Comments.findById(comments._id).populate('userId')

      return res.json(newComment); 
    } catch (e) {
      return res.status(401).json(e.message);
    }
  },

  getComments: async (req, res) => {
    try {
      const comments = await Comments.find().populate('userId');

      return res.json(comments);
    } catch (e) {
      return res.status(401).json(e.message);
    }
  },
};
