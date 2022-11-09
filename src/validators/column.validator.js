const Joi = require('joi');

module.exports = {
	createColumn: Joi.object().keys({
		boardID: Joi.string(),
		name: Joi.string().min(3).max(16).required(),
	}),
};
