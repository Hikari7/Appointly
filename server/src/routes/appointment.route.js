const router = require("express").Router();

const { guestFormMtg } = require('../controllers/appointment.controller')

router.post("/guestFormMtg", guestFormMtg);


module.exports = router
