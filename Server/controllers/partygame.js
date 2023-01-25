const asyncHandler = require('express-async-handler');
const model = require('../model/partygame');

const getAllGameQuestions = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getAllGameQuestions());
});

module.exports = {
  getAllGameQuestions,
};
