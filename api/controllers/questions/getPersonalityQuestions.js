const mongoose = require('mongoose');
const Question = require('../../models/questions');
const Quiz = require('../../models/quiz');

exports.getPersonalityQuestions = (req, res) => {
  Question.find({ quiz: { $eq: req.body.quizId } })
      .select('-__v')
      .exec()
      .then((questions) => {

        res.status(200).json({
          questions: questions.map((question) => {
            return {
              _id: question._id,
              quiz: question.quiz,
              personalityQuestion: question.personalityQuestion,
              personalityAnswers: question.personalityAnswers,
              questionImage: question.questionImage
            };
          }),
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
}
