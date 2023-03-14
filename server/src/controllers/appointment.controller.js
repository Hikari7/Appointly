const { fetchAppointment, guestFormMtg } = require('../middleware/appointment.service')

exports.fetchAppointmentController = async (req, res) => {
    try {
        const { _id } = req.body
        const allAppointments = await fetchAppointment(_id)
        return res.json(allAppointments);
    } catch (error) {
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}

exports.guestFormMtgController = async (req, res) => {
    try {
        await guestFormMtg(req.body)
    } catch (error) {
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}


