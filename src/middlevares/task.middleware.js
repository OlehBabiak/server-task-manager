const {taskValidator} = require("../validators");

module.exports = {
	checkTaskValidityMiddleware: async (req, res, next) => {
		try {
			const { error } = await taskValidator.createTask.validate(req.body);
			if (error) {
				return res.status(400).json({ message: `${error.details[0].message}` });
			}
			next();
		} catch (e) {
			next(e);
		}
	}
};
