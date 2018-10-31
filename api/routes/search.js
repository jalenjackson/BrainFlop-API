const express = require('express');
const SearchController = require('../controllers/searchController');

const router = express.Router();

// search quiz questions
router.get('/questions', SearchController.searchQuestions);

// search all tags
router.get('/tags', SearchController.searchTags);


module.exports = router;
