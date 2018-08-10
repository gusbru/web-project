import orm from '../config/db';

orm.import(`${__dirname}/../models/User`);

const initORM = (app) => {
  console.log(orm.models)
  orm.User = orm.models.users;
  app.set('orm', orm);
};

export default initORM;
