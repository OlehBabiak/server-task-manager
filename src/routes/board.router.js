const {authMiddleware, boardMiddleware} = require("../middlevares");
const {boardController} = require("../controllers");
const router = require('express').Router();

router.use(authMiddleware.checkAccessToken);

router.post('/', boardMiddleware.checkBoardValidityMiddleware, boardController.createBoard);
router.get('/', boardController.getBoards);
router.get('/:id', boardController.getBoardById);
router.put('/:id', boardMiddleware.checkBoardValidityMiddleware, boardController.updateBoardById);
router.delete('/:id', boardController.deleteBoardById);



module.exports = router;
