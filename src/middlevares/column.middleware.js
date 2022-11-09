const {columnValidator} = require("../validators");

module.exports = {
	checkColumnValidityMiddleware: async (req, res, next) => {
		try {
			const { error } = await columnValidator.createColumn.validate(req.body);
			if (error) {
				return res.status(400).json({ message: `${error.details[0].message}` });
			}
			next();
		} catch (e) {
			next(e);
		}
	}
};
