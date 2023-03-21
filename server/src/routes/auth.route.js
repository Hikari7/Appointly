const router = require("express").Router();

const { loginController, signUpController, passwordResetController } = require('../controllers/auth.controller')

router.post("/login", loginController);
router.post("/signup", signUpController);
router.post("/passwordreset", passwordResetController)

module.exports = router
