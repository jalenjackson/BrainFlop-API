const express = require('express');
const BlogController = require('../controllers/blogsController');

const router = express.Router();

// Retrieve individual blog
router.get('/:postId', BlogController.getBlog);

module.exports = router;
