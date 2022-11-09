const {columnController} = require("../controllers");
const {authMiddleware, columnMiddleware} = require("../middlevares");
const router = require('express').Router()

router.use(authMiddleware.checkAccessToken);

router.post('/', columnMiddleware.checkColumnValidityMiddleware, columnController.createColumn);
router.get('/', columnController.getColumns);

module.exports = router;
