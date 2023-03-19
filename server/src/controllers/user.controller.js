const { fetchAppointment, setAvailability, rescheduleMtg } = require('../middleware/user.service')

exports.fetchAppointmentController = async (req, res) => {
    // const { _id } = req.body
    // const allAppointments = await fetchAppointment(_id)
    // return res.json(allAppointments);
    
    try {
        const { _id } = req.body
        const allAppointments = await fetchAppointment(_id)
        return res.json(allAppointments);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}

exports.setAvailabilityController = async (req, res) => {
    try {
        const newAvailability = await setAvailability(req.body)
        return res.json(newAvailability)
    } catch (error) {
        console.log(error);
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}

exports.rescheduleMtgController = async (req, res) => {
    try {
        // const { _id } = req.body
        const { appointmentDateTime } = req.body
        const changedMtg = await rescheduleMtg(req.body)
        return res.json(changedMtg)
    } catch (error) {
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}