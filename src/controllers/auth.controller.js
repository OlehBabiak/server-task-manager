const {passwordHasher} = require("../helpers/index");
const {userService} = require("../services/index");
const {OAuth, UserDB} = require("../dataBase/index");
module.exports = {
	register: async ( req, res, next ) => {
		try {
			const userData = req.body;
			console.log(userData)
			userData.password = await passwordHasher.hashPass(userData.password);
			userData.created_date = await new Date();
			userData.email = req.body.email.toLowerCase();
			await UserDB.create(userData);
			res.status(200).json({
				message: 'Profile created successfully',
			});
		} catch (e) {
			next(e);
		}
	},
	login: async (req, res, next) => {
		try {
			const user = await UserDB
				.findOne({ email: req.body.email.toLowerCase() });
			const hasher = user ? await passwordHasher.compare(req.body.password, user.password) : false;
			if (user && hasher) {
				const payload = userService.createLoginPayload(user.email, user._id);
				const tokenPair = await userService.createTokenPair(payload);
				console.log('tokenPair: ', tokenPair)
				req.headers = { Bearer: tokenPair.jwt_token };
				
				await OAuth.create({
					...tokenPair,
					user: user._id,
				});
				
				return res
					.status(200)
					.json({
						jwt_token: tokenPair.jwt_token,
						refresh_token: tokenPair.refresh_token,
						id: user._id,
						expiresIn: '120',
						expiresInRefresh: '240',
						email: user.email,
					});
			}
			return res
				.status(400)
				.json({ message: 'Not authorized! Check your authorize data!' });
		} catch (e) {
			next(e);
		}
	},
}
