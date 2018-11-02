import Joi from 'joi';

export default (usuario) => {
	const schema = {
		login: Joi.string().min(3).required(),
		senha: Joi.string().min(4).required(),
		nome: Joi.string().min(3).required(),
	};

	return Joi.validate(usuario, schema);
};