import Sequelize from 'sequelize';

// const database = (process.env.NODE_ENV === 'test') ? 'project-test' : 'project';
// This is about the database or the test

// database, username, password
export default new Sequelize('web', 'root', '1234', {
	dialect: 'msysql',
});
