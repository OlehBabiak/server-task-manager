const {taskController} = require("../controllers");
const {authMiddleware, taskMiddleware} = require("../middlevares");
const router = require('express').Router()

router.use(authMiddleware.checkAccessToken);

router.post('/', taskMiddleware.checkTaskValidityMiddleware, taskController.createTask);
router.put('/', taskMiddleware.checkTaskValidityMiddleware, taskController.updateTask);
router.get('/archive', taskController.getArchiveTasks);
router.get('/:id', taskController.getTaskById);

module.exports = router;
