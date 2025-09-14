const express = require('express');
const router = express.Router();
const { getHighScores, saveScore } = require('../controllers/gameController');

// Get scores
router.get('/scores', getHighScores);

// Save score
router.post('/scores', saveScore);

module.exports = router;
