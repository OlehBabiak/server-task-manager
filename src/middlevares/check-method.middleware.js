
module.exports = {
	checkUserValidityMiddleware: async (req, res, next) => {
		try {
			const { error } = await userValidator.createUser.validate(req.body);
			if (error) {
				return res.status(400).json({ message: 'Password or email is not valid!' });
			}
			next();
		} catch (e) {
			next(e);
		}
	},
	};
