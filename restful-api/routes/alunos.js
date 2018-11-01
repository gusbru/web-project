import express from 'express';
// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import auth from '../middlewares/auth';
import generateToken from '../services/generateToken';

import validateAluno from '../validations/alunos';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/me', auth, wrapAsync(async (req, res) => {
  //Need JWT user in req
  const alunos = await req.orm.query(
    `SELECT login
    FROM ${req.orm.tabela.alunos} 
    WHERE login = '${req.user._id}'`,
    { type: req.orm.QueryTypes.SELECT });

  res.send(alunos);
}));

routes.get('/', auth, wrapAsync(async (req, res) => {
  const alunos = await req.orm.query(
    `SELECT * 
    FROM ${req.orm.tabela.questoes}`,
    { type: req.orm.QueryTypes.SELECT }
  );

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


  const salt = await bcrypt.genSalt(10);
  const senhaHashed = await bcrypt.hash(senha, salt);

  alunos = await req.orm.query(`INSERT INTO alunos VALUES (
    '${login}',
    '${senhaHashed }')`, { type: req.orm.QueryTypes.INSERT });

  const token = generateToken(login);
  res.header('x-auth-token', token).send(_.pick(req.body, ['login']));
}));

export default routes;