const {authController} = require("../controllers/index");
const {userMiddleware} = require("../middlevares/index");
const router = require('express').Router();

router.post('/register', userMiddleware.checkUserValidityMiddleware, userMiddleware.isUserExistMiddleware, authController.register)
router.post('/login', authController.login)

module.exports = router;
