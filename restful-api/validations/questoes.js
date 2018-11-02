import Joi from 'joi';

export default (questao) => {
	const schema = {
		enunciado: Joi.string().min(3).required(),
		resposta_correta: Joi.string().max(1).required(),
		alternativas: Joi.array().length(4).items(
			Joi.string().max(1).required(),
			Joi.string().max(1).required(),
			Joi.string().max(1).required(),
			Joi.string().max(1).required()
		),
	};

	return Joi.validate(questao, schema);
};