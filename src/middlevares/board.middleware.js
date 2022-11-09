const {boardValidator} = require("../validators");

module.exports = {
	checkBoardValidityMiddleware: async (req, res, next) => {
		try {
			const { error } = await boardValidator.createBoard.validate(req.body);
			if (error) {
				return res.status(400).json({ message: `${error.details[0].message}` });
			}
			next();
		} catch (e) {
			next(e);
		}
	}
};
