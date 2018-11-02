// Rota em construção

import express from 'express';

import auth from '../middlewares/auth';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/', auth, wrapAsync(async (req, res) => {
  const { tabela } = req.orm;

  const questoes = await req.orm.query(
    `SELECT * 
    FROM ${tabela.questoes}`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(questoes);
}));

routes.get('/me', auth, wrapAsync(async (req, res) => {
  const { tabela, chavePrimaria } = req.orm;

  const questoes = await req.orm.query(
    `SELECT enunciado 
    FROM ${tabela.questoes} 
    WHERE ${chavePrimaria.questoes} IN (
      SELECT ${chavePrimaria.alunosQuestoes} 
      FROM ${tabela.alunosQuestoes} 
      WHERE ${chavePrimaria.usuarios} = '${req.user._id}'
    )`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(questoes);
}));

export default routes;