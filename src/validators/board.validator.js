const Joi = require('joi');

module.exports = {
	createBoard: Joi.object().keys({
		name: Joi.string().min(4).max(16).required(),
		description: Joi.string().min(8).max(60),
	}),
};
