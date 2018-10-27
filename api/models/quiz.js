const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: true },
  quizImage: { type: String, required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);
