const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const UsersController = require('../controllers/usersController');

// Sign up
router.post('/signup', UsersController.signUp);

// Update customized tags
router.post('/update-customized-tags', checkAuth, UsersController.updateCustomizedTags);

// Update user analytics
router.post('/analytics', checkAuth, UsersController.updateUserAnalytics);

// Delete user
router.delete('/:userId', checkAuth, UsersController.deleteUser);

// Sign In
router.post('/login', UsersController.login);

module.exports = router;
