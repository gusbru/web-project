import orm from '../config/db';

// orm.import(`${__dirname}/../models/Aluno`);

const initORM = (app) => {
	// orm.Aluno = orm.models.alunos;
	app.set('orm', orm);
};

export default initORM;
