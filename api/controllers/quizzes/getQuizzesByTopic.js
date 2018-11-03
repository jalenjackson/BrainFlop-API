const Quiz = require('../../models/quiz');

exports.getAllQuizzesByTopic = (req, res) => {
  console.log(req.body.skipIterator)
  Quiz.find(({"tags" : { $regex : new RegExp('^' + req.body.topic + '$', 'i') } }))
    .skip(req.body.skipIterator)
    .limit(8)
    .exec()
    .then((quizzes) => {
      const response = {
        count: quizzes.length,
        quizzes: quizzes.map((quiz) => {
          return {
            _id: quiz._id,
            title: quiz.title,
            userId: quiz.userId,
            description: quiz.description,
            tags: quiz.tags,
            quizImage: quiz.quizImage,
            request: {
              type: 'GET',
              url: `http://localhost:3001/quizzes/${quiz._id}`,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
