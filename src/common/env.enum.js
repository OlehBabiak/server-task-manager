import { config } from 'dotenv';

config();

const {
	APP_PORT,
} = process.env;

const ENV = {
	APP: {
		PORT: APP_PORT,
	},
};

export {ENV}
