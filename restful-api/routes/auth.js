import express from 'express';
import bcrypt from 'bcrypt';

import validate from '../validations/auth';
import wrapAsync from '../middlewares/wrapAsync';
import generateToken from '../services/generateToken';

const routes = express.Router();

routes.post('/', wrapAsync(async (req, res) => {  
  const login = req.body.login;
  const senha = req.body.senha;
  const { tabela } = req.orm;
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let aluno = await req.orm.query(
    `SELECT login, senha 
    FROM ${tabela.usuarios} 
    WHERE login = '${login}'`,
    { type: req.orm.QueryTypes.SELECT }
  );

  if (!aluno[0]) return res.status(400).send('Email ou senha inválido.');

  const validPassword = await bcrypt.compare(senha, aluno[0]['senha'])
  if (!validPassword) return res.status(400).send('Email ou senha inválido.');

  const token = generateToken(login);
  res.send(token);
}));

export default routes;