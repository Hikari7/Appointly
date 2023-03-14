const router = require("express").Router();

const { fetchAppointmentController } = require('../controllers/appointment.controller')

router.get("/getappointments", fetchAppointmentController);
router.put("/reschedulemtg", rescheduleMtgController);
// router.delete("/deletemtg", deleteMtgController);

module.exports = router
