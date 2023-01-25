const express = require('express');
const { getAllGameQuestions } = require('../controllers/partygame');

const router = express.Router();

// Alle Fragen für das Spezifische Spiel
router.get('/gameQuestions', getAllGameQuestions);

module.exports = router;
