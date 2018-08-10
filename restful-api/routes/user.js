import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  req.orm.User
    .findAll()
    .then(users => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: 'Something failed!' });
    });
});

export default routes;