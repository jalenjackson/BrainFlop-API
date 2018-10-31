const Quiz = require('../../models/quiz');

exports.updateQuiz = (req, res) => {
  const id = req.params.quizId;
  const isThereANewPlay = req.body.addToTotalPlays

  var conditions = { upsert: true },
  update = { $inc: { totalPlays: 1 }};

  if (isThereANewPlay) {
    Quiz.findByIdAndUpdate(id, { $inc: { totalPlays: 1 }}, {upsert: true}, function(err, data){
      res.status(200).json({
        data,
        message: 'Quiz updated succesfully!',
        request: {
          type: 'GET',
          url: `http://localhost:3001/quizzes/${id}`,
        },
      });
    })
  } else {
    Quiz.updateMany({_id: id}, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
      },
    })
      .exec()
      .then((res) => {
        res.status(200).json({
          message: 'Quiz updated succesfully!',
          request: {
            type: 'GET',
            url: `http://localhost:3001/quizzes/${id}`,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
