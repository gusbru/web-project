import express from 'express';

const routes = express.Router();

routes.get('/', async (req, res) => {
  const a = await req.orm.User.findAll();
  res.send(a);
/*
    .then(users => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: 'Something failed!' });
    });
*/
});

export default routes;