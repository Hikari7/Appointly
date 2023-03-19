const router = require("express").Router();

const { fetchAppointmentController, setAvailabilityController } = require('../controllers/user.controller')

router.get("/getappointments", fetchAppointmentController);
router.post("/setavailability", setAvailabilityController)
// router.put("/reschedulemtg", rescheduleMtgController);
// router.delete("/deletemtg", deleteMtgController);

module.exports = router
