const router = require("express").Router();

const {
  fetchAppointmentController,
  fetchAvailabilityController,
  setAvailabilityController,
  updateUserInfoController,
  updatePasswordController,
  rescheduleMtgController,
  deleteMtgController,
} = require("../controllers/user.controller");

router.get("/:uid/getappointment", fetchAppointmentController);

router.get("/:uid/getavailability", fetchAvailabilityController)

router.post("/:uid/setavailability", setAvailabilityController);

router.put("/:uid/updateUserInfo", updateUserInfoController)

router.put("/:uid/updatepassword", updatePasswordController)

router.put("/:appointmentid/reschedule", rescheduleMtgController);

router.delete("/:appointmentid/deleteappointment", deleteMtgController);

module.exports = router;
