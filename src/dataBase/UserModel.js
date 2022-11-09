const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		email: {
			type: String,
			require: true,
			unique: false,
		},
		password: {
			type: String,
			require: true,
		},
		created_date: {
			type: String,
		},
	},
);

module.exports = model('User', userSchema);
