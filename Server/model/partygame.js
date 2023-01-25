const { query } = require('../db/index');

const getAllGameQuestions = async () =>
  (await query('SELECT * FROM public."Fragen"')).rows;

module.exports = {
  getAllGameQuestions,
};
