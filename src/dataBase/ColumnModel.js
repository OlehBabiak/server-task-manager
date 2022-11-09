const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");


const columnSchema = new Schema(
	{
		userID: {
			type: mongoose.Schema.Types.ObjectId,
		},
		boardID: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			ref: 'Board'
		},
		name: {
			type: String,
			require: true
		},
		// tasks: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'Tasks'
		// 	}
		// ]
	},
	{timestamps: true, toJSON: {virtuals: true}},
)

columnSchema.virtual('tasks', {
	ref: 'Tasks',
	localField: ['boardID', 'name'],
	foreignField: ['boardID', 'status']
});
// localField привязується до foreignField тт name колонки === status таски
module.exports = model('Columns', columnSchema)
