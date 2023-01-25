const express = require('express');
const {
  getAllGameQuestions,
  getQuestionsForGame,
  createQuestion,
  updateQuestion,
} = require('../controllers/partygame');

const router = express.Router();

// Fragen Routen
router.get('/gameQuestions', getAllGameQuestions);
router.get('/gameQuestions/:game_id', getQuestionsForGame);
router.post('/newQuestion', createQuestion);
router.patch('/editQuestion/:question_id', updateQuestion);

module.exports = router;
