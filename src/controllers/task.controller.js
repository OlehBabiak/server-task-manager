const {TaskDB, BoardDB} = require("../dataBase");

module.exports = {
	createTask: async ( req, res, next ) => {
		try {
			const task = {
				userID: req.user.userId,
				...req.body,
			}
			await TaskDB.create(task);
			const id = req.body.boardID
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
	updateTask: async ( req, res, next ) => {
		try {
			const {_id, boardID, name, status, description, comments} = req.body
			console.log('updated task: ', req.body)
			await TaskDB.findByIdAndUpdate({_id: _id}, {
				$set: {
					boardID,
					name,
					status,
					description,
					comments
				}
			});
			const id = req.body.boardID
			await BoardDB
				.findOne({_id: boardID})
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
	
	getArchiveTasks: async ( req, res, next) => {
		try {
			console.log('jdshfkjsdhkjfshd')
			const archiveTasks = await TaskDB.find(
				{userID: req.user.userId, status: 'archive'}
			)
			if (archiveTasks) {
				return res.status(200).json(archiveTasks)
			}
			return res.status(400).json({message: `Tasks not found!`});
		}catch (e) {
			next(e)
		}
	},
	
	getTaskById: async (req, res, next) => {
		try {
			console.log('jdshfkjsdhkjfshd')
			const {id} = req.params
			console.log(id)
			const task = await TaskDB.findOne({_id: id});
			if (task) {
				return res.status(200).json(task)
			}
			return res.status(400).json({message: `Task with id ${id} not found!`});
		}catch (e) {
			next(e)
		}
	}
}
