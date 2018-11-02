import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import generateToken from '../services/generateToken';

import validateAluno from '../validations/usuarios';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.post('/', wrapAsync(async (req, res) => {  
  const login = req.body.login;
  const senha = req.body.senha;
  const nome = req.body.nome;

  const { tabela } = req.orm;
  const { error } = validateAluno(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let usuario = await req.orm.query(
    `SELECT login
    FROM ${tabela.usuarios} 
    WHERE login = '${login}'`,
    { type: req.orm.QueryTypes.SELECT }
  );

  if (usuario[0]) return res.status(400).send('Usuário já registrado.');

  const salt = await bcrypt.genSalt(10);
  const senhaHashed = await bcrypt.hash(senha, salt);

  usuario = await req.orm.query(
    `INSERT INTO ${tabela.usuarios} 
    VALUES (
      '${login}',
      '${senhaHashed }',
      '${nome}'
    )`,
    { type: req.orm.QueryTypes.INSERT }
  );

  usuario = await req.orm.query(
    `INSERT INTO ${tabela.alunos}(login, coeficiente_rendimento)
    VALUES (
      '${login}',
      0
    )`,
    { type: req.orm.QueryTypes.INSERT }
  );

  const token = generateToken(login);
  res.header('x-auth-token', token).send(_.pick(req.body, ['login']));
}));

export default routes;