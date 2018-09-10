import express from 'express';

import initializer from './config/init';
import initORM from './services/db';
import bodyParser from 'body-parser';

import auth from './routes/auth';
import alunos from './routes/alunos';
import error from './middlewares/error';	

// const port = process.env.PORT || 3000;
const port = 3005;

const app = express();


initORM(app);
app.orm = app.get('orm');

app.use('/', initializer(app));
app.use(bodyParser.json());

app.use('/api/alunos', alunos);
app.use('/api/auth', auth);

app.use(error);

app.listen(port, () => console.log(`Listening on port ${port}...`));
