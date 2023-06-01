const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Get a room by ID
router.get('/room/:id', roomController.getRoom);

// Create a new room
router.post('/room', roomController.createRoom);

// // Update the value of a room
router.patch('/room/:id', roomController.updateRoom);

module.exports = router;