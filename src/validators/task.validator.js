const Joi = require('joi');

module.exports = {
	createTask: Joi.object().keys({
		boardID: Joi.string(),
		name: Joi.string().min(5).max(16).required(),
		status: Joi.string().required(),
		description: Joi.string().min(8).max(60),
		_id: Joi.string(),
		comments: Joi.array().items({
			comment: Joi.string().min(5)
		}),
		createdAt: Joi.date(),
		updatedAt: Joi.date(),
	}),
};
