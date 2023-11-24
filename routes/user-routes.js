// user-routes.js
const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

// Define routes for CRUD operations on users
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
// Add other routes as needed

module.exports = router;
