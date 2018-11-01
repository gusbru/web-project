import orm from '../config/db';

// orm.import(`${__dirname}/../models/Aluno`);

const initORM = (app) => {
	// orm.Aluno = orm.models.alunos;

	// Nome das tabelas
	orm.tabela = {
		alunos: 'alunos',
		questoes: 'questoes',
		alunosQuestoes: 'questoes_alunos',
	};
	
	orm.chavePrimaria = {
		alunos: 'login',
		questoes: 'cod',
		alunosQuestoes: 'cod'
	};
	
	app.set('orm', orm);
};

export default initORM;
