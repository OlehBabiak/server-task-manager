const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
	{
		comment: {
			type: String
		}
	}
)

module.exports = model('Comment', commentSchema)
