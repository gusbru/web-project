import express from 'express';

import initializer from './config/init';
import initORM from './services/db';

import user from './routes/user';

// const port = process.env.PORT || 3000;
const port = 3005;

const app = express();

initORM(app);
app.orm = app.get('orm');

app.use('/', initializer(app));

app.use('/', user);

app.listen(port, () => console.log(`Listening on port ${port}...`));