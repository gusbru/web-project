export default (sequelize, DataTypes) => (
	sequelize.define('users', {
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		senha: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	}, {
		timestamps: false,
	})
);