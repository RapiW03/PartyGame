const asyncHandler = require('express-async-handler');
const model = require('../model/partygame');

const getAllGameQuestions = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getAllGameQuestions());
});

const getQuestionsForGame = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getQuestionsForGame(req.params.game_id));
});

const createQuestion = asyncHandler(async (req, res) => {
  res.status(200).json(await model.createQuestion(req.body));
});

const updateQuestion = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(await model.updateQuestion(req.params.question_id, req.body));
});

module.exports = {
  getAllGameQuestions,
  getQuestionsForGame,
  createQuestion,
  updateQuestion,
};
