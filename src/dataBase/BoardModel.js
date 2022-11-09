const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");


const boardSchema = new Schema(
	{
		userID: {
			type: mongoose.Schema.Types.ObjectId,
		},
		name: {
			type: String,
			require: true
		},
		description: {
			type: String,
			require: false
		},
	},
	{toJSON: {virtuals: true}, timestamps: true},
)

boardSchema.virtual('columns', {
	ref: 'Columns',
	localField: '_id',
	foreignField: 'boardID'
});

module.exports = model('Board', boardSchema)
