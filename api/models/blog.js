const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Blog', blogSchema);
