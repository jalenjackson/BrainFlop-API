const Question = require('../../models/questions');
const he = require('he')

exports.getAllQuestions = (req, res) => {
  Question.find({ quiz: { $eq: req.body.quizId } })
    .select('-__v')
    .exec()
    .then((questions) => {
      res.status(200).json({
        count: questions.length,
        questions: questions.map((question) => {
          return {
            _id: question._id,
            quiz: question.quiz,
            question: he.decode(question.question),
            answer1: he.decode(question.answer1),
            answer2: he.decode(question.answer2),
            answer3: he.decode(question.answer3),
            answer4: he.decode(question.answer4),
            questionImage: question.questionImage,
            request: {
              type: 'GET',
              url: `http://localhost:3001/questions/${question._id}`,
            },
          };
        }),
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};
