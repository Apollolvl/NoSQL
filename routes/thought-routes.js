// thought-routes.js
const express = require('express');
const thoughtController = require('../controllers/thought-controller');

const router = express.Router();

// Define routes for CRUD operations on thoughts
router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', thoughtController.getThoughtById);
// Add other routes as needed

module.exports = router;
