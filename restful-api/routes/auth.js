import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validate from '../validations/auth';
import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.post('/', wrapAsync(async (req, res) => {  
  const login = req.body.login;
  const senha = req.body.senha;

  console.log(req.body)

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let alunos = await req.orm.query(`SELECT login, senha FROM alunos WHERE login = '${login}'`,
    { type: req.orm.QueryTypes.SELECT });

  if (!alunos[0]) return res.status(400).send('Email ou senha inválido.');

  const validPassword = await bcrypt.compare(senha, alunos[0]['senha'])
  if (!validPassword) return res.status(400).send('Email ou senha inválido.');

  const token = jwt.sign({ _id: login }, 'privateKey');

  res.send(token);
}));

export default routes;