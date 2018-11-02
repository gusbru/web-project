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

routes.get('/:login', auth, wrapAsync(async (req, res) => {
  const { login } = req.params;
  const { tabela, chavePrimaria } = req.orm;

  const questoes = await req.orm.query(
    `SELECT q.enunciado, a.resposta
    FROM ${tabela.alunosQuestoes} a, ${tabela.questoes} q
    WHERE a.login = '${login}'
      AND a.codigo_questao = q.codigo_questao`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(questoes);
}));

export default routes;