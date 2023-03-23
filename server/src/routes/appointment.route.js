const router = require("express").Router();

const { registerMtgController } = require('../controllers/appointment.controller')

router.post("/registermtg", registerMtgController);
/* Request param example
    { 
        hostUser: "",
        name: "",
        email: "",
        message: "",
        date: "",
        time: ""
    }
*/ 

module.exports = router
