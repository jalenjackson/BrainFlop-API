const express = require('express');
const upload = require('../imageUpload/quizImageMulter');
const checkAuth = require('../middleware/checkAuth');
const QuestionsController = require('../controllers/questionsController');

const router = express.Router();

// GET all questions
router.post('/get-quiz-questions', QuestionsController.getAllQuestions);

// Create new question
router.post('/', checkAuth, upload.single('questionImage'), QuestionsController.createNewQuestion);

// Retrieve individual question
router.get('/:questionId', QuestionsController.retrieveQuestion);

// Update question
router.patch('/:questionId', checkAuth, QuestionsController.updateQuestion);

// Delete question
router.delete('/:questionId', checkAuth, QuestionsController.deleteQuestion);

module.exports = router;
