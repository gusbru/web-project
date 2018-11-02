import orm from '../config/db';

const initORM = (app) => {

	// Nome das tabelas
	orm.tabela = {
		usuarios: 'usuarios',
		alunos: 'alunos',
		professores: 'professores',
		questoes: 'questoes',
		alternativas: 'alternativas',
		alunosQuestoes: 'alunos_questoes',
	};
	
	// Chaves primárias
	orm.chavePrimaria = {
		usuarios: 'login',
		alunos: 'codigo',
		professores: 'codigo',
		questoes: 'codigo_questao',
		alternativas: 'codigo_alternativa',
		alunosQuestoes: 'codigo_alunos_questoes'
	};
	
	app.set('orm', orm);
};

export default initORM;
