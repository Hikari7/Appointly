const router = require("express").Router();

const { fetchAppointmentController, setAvailabilityController, rescheduleMtgController } = require('../controllers/user.controller')

router.get("/getappointment", fetchAppointmentController);
router.post("/setavailability", setAvailabilityController)
router.post("/reschedulemtg", rescheduleMtgController);
// router.delete("/deletemtg", deleteMtgController);

module.exports = router
