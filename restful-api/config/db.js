import Sequelize from 'sequelize';

// const database = (process.env.NODE_ENV === 'test') ? 'project-test' : 'project';
// This is about the database or the test

// database, username, password
export default new Sequelize('web', 'root', 'password', {
	dialect: 'mysql',
});

/*
export default new Sequelize('web-project-es', 'usuario', 'pUc#wEb@2018', {
	host: 'web-project-es.database.windows.net',
	port: 1433,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	dialectOptions: {
		encrypt: true
	}
});

*/