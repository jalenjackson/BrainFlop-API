const Quiz = require('../../models/quiz');

exports.searchQuizzes = (req, res) => {
  console.log(req.query)

  var regex = new RegExp(req.query["term"], 'i');
  var query = Quiz.find({$or:[{title: regex},{tags: regex},{description: regex}]}, { 'quizImage': 1, 'title': 1, 'description': 1, 'tags': 1})
    .skip(Number(req.query["skipIterator"]))
    .sort({"updated_at":-1})
    .sort({"created_at":-1})
    .limit(10);

  query.exec(function(err, quizzesFound) {
    if (!err) {
      res.status(201).json({
        quizzesFound,
      });
    } else {
      res.status(404).json({
        error: 'an error occurred'
      });
    }
  });
};
