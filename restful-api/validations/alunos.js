import Joi from 'joi';

export default (aluno) => {
	const schema = {
		login: Joi.string().min(3).required(),
		senha: Joi.string().min(4).required(),
	};

	return Joi.validate(aluno, schema);
};