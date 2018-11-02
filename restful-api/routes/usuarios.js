import express from 'express';
import _ from 'lodash';

import auth from '../middlewares/auth';

import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/', auth, wrapAsync(async (req, res) => {
  const { tabela } = req.orm;

  const usuarios = await req.orm.query(
    `SELECT * 
    FROM ${tabela.usuarios}`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(usuarios);
}));

export default routes;