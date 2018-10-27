const express = require('express');
const SearchController = require('../controllers/searchController');

const router = express.Router();

// search quiz questions
router.get('/questions', SearchController.searchQuestions);

module.exports = router;
