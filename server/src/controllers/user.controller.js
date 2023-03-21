const { fetchAppointment, setAvailability, rescheduleMtg, deleteAppointment } = require('../middleware/user.service')

exports.fetchAppointmentController = async (req, res) => {
    const { uid } = req.params
    const allAppointments = await fetchAppointment(uid)
    return res.json(allAppointments);
    
    try {
        const { uid } = req.params
        const allAppointments = await fetchAppointment(_id)
        return res.json(allAppointments);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}

exports.setAvailabilityController = async (req, res) => {
    try {
        const { uid } = req.params
        const newAvailability = await setAvailability(uid, req.body)
        return res.json(newAvailability)
    } catch (error) {
        console.log(error);
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}

exports.rescheduleMtgController = async (req, res) => {
    try {
        const { appointmentid } = req.params
        const { changedDateTime } = req.body
        const changedMtg = await rescheduleMtg(appointmentid, changedDateTime)
        return res.json(changedMtg)
    } catch (error) {
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}

exports.deleteMtgController = async (req, res) => {
    try {
        const { appointmentid } = req.params
        await deleteAppointment(appointmentid)
    } catch (error) {
        console.log(error);
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}
