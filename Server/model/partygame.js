const { query } = require('../db/index');

// Fragen SQl Statements
const getAllGameQuestions = async () =>
  (await query('SELECT * FROM public."Fragen"')).rows;

const getQuestionsForGame = async (game_id) =>
  (await query('SELECT * FROM "Fragen" WHERE "Game_ID" =$1', [game_id])).rows;

const createQuestion = async (newQuestion) =>
  (
    await query(
      'INSERT INTO "Fragen" ("Frage", "Kategorie", "SingleFrage", "GruppenFrage", "Game_ID") VALUES ($1, $2, $3, $4, $5) returning *',
      [
        newQuestion.Frage,
        newQuestion.Kategorie,
        newQuestion.SingleFrage,
        newQuestion.GruppenFrage,
        newQuestion.Game_ID,
      ]
    )
  ).rows;

const updateQuestion = async (question_id, updateQuestion) =>
  (
    await query(
      'UPDATE "Fragen" SET "Frage" = $1, "Kategorie" = $2, "SingleFrage" = $3, "GruppenFrage" = $4 WHERE "Fragen_ID" = $5 returning *',
      [
        updateQuestion.Frage,
        updateQuestion.Kategorie,
        updateQuestion.SingleFrage,
        updateQuestion.GruppenFrage,
        question_id,
      ]
    )
  ).rows;

// User Statements

module.exports = {
  getAllGameQuestions,
  getQuestionsForGame,
  createQuestion,
  updateQuestion,
};
