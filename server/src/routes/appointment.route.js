const router = require("express").Router();

const { guestFormMtgController } = require('../controllers/appointment.controller')

router.post("/guestFormMtg", guestFormMtgController);


module.exports = router
