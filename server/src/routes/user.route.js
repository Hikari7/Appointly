const router = require("express").Router();

const {
  fetchAppointmentController,
  fetchAvailabilityController,
  setAvailabilityController,
  rescheduleMtgController,
  deleteMtgController,
} = require("../controllers/user.controller");

router.get("/:uid/getappointment", fetchAppointmentController);
/* Request param example
    { userId: ""}
*/

router.get("/:uid/getavailability", fetchAvailabilityController)

router.post("/:uid/setavailability", setAvailabilityController);


router.put("/:appointmentid/reschedule", rescheduleMtgController);
/* Request param example
    { 
        changedDateTime: { date: "2023-03-20", time: "10:00"}
    }
*/

router.delete("/:appointmentid/deleteappointment", deleteMtgController);
/* Request param example
    { 
        appointmentId: ""
    }
*/

module.exports = router;
