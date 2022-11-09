const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");


const taskSchema = new Schema(
	{
		userID: {
			type: mongoose.Schema.Types.ObjectId,
		},
		boardID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Board'
		},
		name: {
			type: String,
			require: true
		},
		status: {
			type: String,
			ref: 'Columns',
			require: true
		},
		description: {
			type: String,
			require: false
		},
		comments: [],
	},
	{timestamps: true}
)


module.exports = model('Tasks', taskSchema)
