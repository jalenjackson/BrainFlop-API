
/*
  Sample response  from API
  {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Virgin Trains, Virgin Atlantic and Virgin Racing, are all companies owned by which famous entrepreneur?",
    "correct_answer": "Richard Branson",
    "incorrect_answers": ["Alan Sugar","Donald Trump","Bill Gates"]
  }

  Reponse to send to create quiz
  {
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    quizImage: req.file.location
  }

  Response to send to create question
  {
    quiz: req.body.quizId,
    question: req.body.question,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4
  }
*/

var request = require('request');
request('https://opentdb.com/api.php?amount=10&category=9&type=multiple', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    let quizObject = {
      userId: '5bd7d642cd1b2f0011c12caf',
      title: 'General Knowledge',
      description: 'Can you Ace this general knowledge quiz? Not many can!',
      tags: "General Knowledge, Knowledge, Smart",
      quizImage:
    }

    let results = JSON.parse(body).results;



    /*
    request.post(
      'http://localhost:8080/quizzes',
      { json: { key: 'value' } },
      function (error, response, body) {
        console.log(error)
        if (!error && response.statusCode == 200) {
          console.log(body)
        }
      }
    );
    */


    /*
    for (var i = 0; i < results.length; i++) {
      question = results[i].question
    }
    */
  }
})