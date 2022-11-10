const { config } = require ('dotenv');

config();

const {
	APP_PORT,
	MONGO_URL
} = process.env;

const ENV = {
	APP: {
		PORT: APP_PORT,
		URL: MONGO_URL
	},
};
module.exports = ENV
