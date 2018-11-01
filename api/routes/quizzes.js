const express = require('express');
const upload = require('../imageUpload/quizImageMulter');
const checkAuth = require('../middleware/checkAuth');
const QuizzesController = require('../controllers/quizzesController');

const router = express.Router();

// GET all quizzes
router.get('/', QuizzesController.quizzesGetAll);

// GET all featured quizzes
router.get('/featured', QuizzesController.getAllFeaturedQuizzes);

// GET quizzes by topic
router.post('/quizzes-by-topic', QuizzesController.getQuizzesByTopic);

// Create new Quiz
router.post('/', checkAuth, upload.single('quizImage'), QuizzesController.createNewQuiz);

// Create new Quiz from API
router.post('/api', checkAuth, upload.single('quizImage'), QuizzesController.createNewQuizFromAPI);

// Retrieve individual quiz
router.get('/:quizId', QuizzesController.retrieveQuiz);

// Update quiz
router.patch('/:quizId', checkAuth, QuizzesController.updateQuiz);

// Update quiz analytics
router.patch('/analytics/:quizId', QuizzesController.updateQuizAnalytics);


// Delete quiz
router.delete('/:quizId', checkAuth, QuizzesController.deleteQuiz);

module.exports = router;
