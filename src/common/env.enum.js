const { config } = require ('dotenv');

config();

const {
	APP_PORT,
} = process.env;

const ENV = {
	APP: {
		PORT: APP_PORT,
	},
};
module.exports = ENV
