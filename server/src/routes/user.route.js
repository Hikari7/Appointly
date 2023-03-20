const router = require("express").Router();

const { fetchAppointmentController, setAvailabilityController, rescheduleMtgController, deleteMtgController } = require('../controllers/user.controller')

router.get("/:uid/getappointment", fetchAppointmentController);
/* Request param example
    { 
        userId: ""
    }
*/ 

router.post("/setavailability", setAvailabilityController)
/* Request param example
    { 
        userId: "",
        weekly: [{ dow: "0", time: ["09:00", "09:30"]}],
        daily: [{ date: "2023-03-20", time: ["09:00", "09:30"] }]
    }
*/ 

router.post("/:appointmentid/reschedule", rescheduleMtgController);
/* Request param example
    { 
        appointmentId: "",
        changedDateTime: { date: "2023-03-20", time: "10:00"}
    }
*/ 

router.delete("/:appointmentid/deleteappointment", deleteMtgController);
/* Request param example
    { 
        appointmentId: ""
    }
*/ 

module.exports = router
