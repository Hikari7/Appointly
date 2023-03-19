const router = require("express").Router();

const { registerMtgController } = require('../controllers/appointment.controller')

router.post("/registermtg", registerMtgController);


module.exports = router
