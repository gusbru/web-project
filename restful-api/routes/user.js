import express from 'express';

import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/', wrapAsync(async (req, res) => {
  // const a = await req.orm.User.findAll();
  const users = await req.orm.query('select * from users', { type: req.orm.QueryTypes.SELECT});
  
  // Try error:
  // throw new Error('sla mano')
  
  res.send(users);
  
/*
  Promise way:
    .then(users => res.send(users))
    .catch((err) => {
      res.status(404).send({ error: 'Something failed!' });
    });
*/
}));

export default routes;