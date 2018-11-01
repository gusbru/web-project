// Rota em construção

import express from 'express';

import auth from '../middlewares/auth';
import wrapAsync from '../middlewares/wrapAsync';


const routes = express.Router();

routes.get('/', auth, wrapAsync(async (req, res) => {
  //Need JWT user in req
  const questoes = await req.orm.query(
    `SELECT * 
    FROM ${req.orm.tabela.questoes}`,
    { type: req.orm.QueryTypes.SELECT });

  res.send(questoes);
}));

routes.get('/me', auth, wrapAsync(async (req, res) => {
  //Need JWT user in req
  const questoes = await req.orm.query(
    `SELECT * 
    FROM ${req.orm.tabela.questoes} 
    WHERE cod IN (
      SELECT codq 
      FROM ${req.orm.tabela.alunosQuestoes} 
      WHERE codl = '${req.user._id}'
    )`,
    { type: req.orm.QueryTypes.SELECT });

  res.send(questoes);
}));

export default routes;