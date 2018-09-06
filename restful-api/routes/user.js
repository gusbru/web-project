import express from 'express';

import wrapAsync from '../middlewares/wrapAsync';

const routes = express.Router();

routes.get('/', wrapAsync(async (req, res) => {
  const a = await req.orm.User.findAll();
  res.send(a);
  
/*
  Promise way:
    .then(users => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: 'Something failed!' });
    });
*/
}));

export default routes;