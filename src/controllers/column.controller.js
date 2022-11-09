const {ColumnDB, BoardDB} = require("../dataBase");

module.exports = {
	createColumn: async ( req, res, next ) => {
		try {
			const column = {
				userID: req.user.userId,
				...req.body,
				tasks: []
			}
			const id = req.body.boardID
			await ColumnDB.create(column)
			await BoardDB
				.findOne({_id: id})
				.populate({
					path: "columns",
					populate: {
						path: "tasks"
					}
				})
				.then(board => {
					if (board) {
						return res.status(200).json(board)
					}
					return res.status(400).json({message: `Not found board with id: ${ id }`});
				})
		} catch (e) {
			next(e);
		}
	},
	
	getColumns: async ( req, res, next ) => {
		try {
		
		} catch (e) {
			next(e);
		}
	},
}
