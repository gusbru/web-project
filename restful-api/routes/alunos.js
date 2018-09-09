import express from 'express';
import _ from 'lodash';

import validateAluno from '../validations/alunos';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/', wrapAsync(async (req, res) => {
  const alunos = await req.orm.query('SELECT * FROM alunos',
    { type: req.orm.QueryTypes.SELECT });

  res.send(alunos);
}));


routes.post('/', wrapAsync(async (req, res) => {  
  const login = req.body.login;
  const senha = req.body.senha;

  const { error } = validateAluno(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let alunos = await req.orm.query(`SELECT login FROM alunos WHERE login = '${login}'`,
    { type: req.orm.QueryTypes.SELECT });

  if (alunos[0]) return res.status(400).send('Aluno já registrado.');

  alunos = await req.orm.query(`INSERT INTO alunos VALUES (
    '${login}',
    '${senha}') `, { type: req.orm.QueryTypes.INSERT });

  res.send(_.pick(req.body, ['login']));
}));

export default routes;