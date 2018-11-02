import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import auth from '../middlewares/auth';
import generateToken from '../services/generateToken';

import validateAluno from '../validations/usuarios';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/me', auth, wrapAsync(async (req, res) => {
  const { tabela } = req.orm;

  const usuario = await req.orm.query(
    `SELECT login
    FROM ${tabela.usuarios} 
    WHERE login = '${req.user._id}'`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(usuario);
}));

routes.get('/', auth, wrapAsync(async (req, res) => {
  const { tabela } = req.orm;

  const usuarios = await req.orm.query(
    `SELECT * 
    FROM ${tabela.usuarios}`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(usuarios);
}));


routes.post('/', wrapAsync(async (req, res) => {  
  const login = req.body.login;
  const senha = req.body.senha;
  const nome = req.body.nome;
  const { tabela } = req.orm;

  const { error } = validateAluno(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let usuarios = await req.orm.query(
    `SELECT login
    FROM ${tabela.usuarios} 
    WHERE login = '${login}'`,
    { type: req.orm.QueryTypes.SELECT }
  );

  if (usuarios[0]) return res.status(400).send('Aluno já registrado.');


  const salt = await bcrypt.genSalt(10);
  const senhaHashed = await bcrypt.hash(senha, salt);

  usuarios = await req.orm.query(
    `INSERT INTO ${tabela.usuarios} 
    VALUES (
      '${login}',
      '${senhaHashed }',
      '${nome}'
    )`,
    { type: req.orm.QueryTypes.INSERT }
  );

  const token = generateToken(login);
  res.header('x-auth-token', token).send(_.pick(req.body, ['login']));
}));

export default routes;