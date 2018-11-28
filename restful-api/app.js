import express from 'express';

import initializer from './config/init';
import initORM from './services/db';
import bodyParser from 'body-parser';

import auth from './routes/auth';
import usuarios from './routes/usuarios';
import alunos from './routes/alunos';
import professores from './routes/professores';
import questoes from './routes/questoes';
import me from './routes/me';
import error from './middlewares/error';	

// const port = process.env.PORT || 3000;
const port = 3005;

const app = express();

initORM(app);
app.orm = app.get('orm');

app.use('/', initializer(app));
app.use(bodyParser.json());

app.all('/api/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, x-auth-token');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
	return next();
});

app.all('/api/*', function(req, res, next) {
	if (req.method.toLowerCase() !== 'options') {
		return next();
	}
	return res.send(204);
});

app.use('/api/usuarios', usuarios);
app.use('/api/alunos', alunos);
app.use('/api/professores', professores);
app.use('/api/questoes', questoes);
app.use('/api/me', me);
app.use('/api/auth', auth);

app.use(error);

app.listen(port, () => console.log(`Listening on port ${port}...`));
