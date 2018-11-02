import express from 'express';

import auth from '../middlewares/auth';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/', auth, wrapAsync(async (req, res) => {
  const { tabela } = req.orm;

  const usuario = await req.orm.query(
    `SELECT login
    FROM ${tabela.usuarios} 
    WHERE login = '${req.user._id}'`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(usuario);
}));

routes.get('/questoes', auth, wrapAsync(async (req, res) => {
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