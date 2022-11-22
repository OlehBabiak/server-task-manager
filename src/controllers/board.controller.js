const {BoardDB, ColumnDB, TaskDB} = require("../dataBase");

//через authMiddleware.checkAccessToken передається userId
module.exports = {
	createBoard: async ( req, res, next ) => {
		try {
			const board = {
				userID: req.user.userId,
				...req.body,
				columns: []
			}
			console.log(board)
			await BoardDB.create(board)
			const boards = await BoardDB.find(
				{userID: req.user.userId}
			)
			if (boards) {
				return res.status(200).json(boards);
			}
			return res.status(404).json({message: 'Not Found'});
		} catch (e) {
			next(e);
		}
	},
	
	getBoards: async ( req, res, next ) => {
		try {
			const boards = await BoardDB.find(
				{userID: req.user.userId}
			)
			if (boards) {
				return res.status(200).json(boards);
			}
			return res.status(400).json({message: 'Not found any boards'});
		} catch (e) {
			next(e);
		}
	},
	getBoardById: async ( req, res, next ) => {
		try {
			const {id} = req.params
			console.log(req.body)
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
	updateBoardById: async ( req, res, next ) => {
		try {
			const {id} = req.params
			const updatedBoard = await BoardDB.findByIdAndUpdate({_id: id}, {
				$set: {
					name: req.body.name,
					description: req.body.description
				}
			})
			if (updatedBoard) {
				const boards = await BoardDB.find(
					{userID: req.user.userId}
				)
				return res.status(200).json(boards);
			}
			return res.status(400).json({message: `Not found board with id: ${ id }`});
		} catch (e) {
			next(e);
		}
	},
	deleteBoardById: async ( req, res, next ) => {
		try {
			const {id} = req.params
			const deletedBoard = await BoardDB.findByIdAndDelete(id);
			await ColumnDB.deleteMany({boardID: id});
			await TaskDB.deleteMany({boardID: id, status: {$ne: "archive"}})
			if (deletedBoard) {
				const boards = await BoardDB.find(
					{userID: req.user.userId}
				)
				return res.status(200).json(boards);
			}
			return res.status(400).json({message: `Not found board with id: ${ id }`});
		} catch (e) {
			next(e);
		}
	}
}
