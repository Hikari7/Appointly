const router = require("express").Router();

const { loginController, signUpController } = require('../controllers/auth.controller')

router.post("/login", loginController);
router.post("/signup", signUpController);

module.exports = router