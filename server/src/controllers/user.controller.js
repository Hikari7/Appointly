const { rescheduleMtg, fetchAppointment } = require('../middleware/user.service')

exports.fetchAppointmentController = async (req, res) => {
    const { _id } = req.body
    const allAppointments = await fetchAppointment(_id)
    return res.json(allAppointments);
    
    // try {
    //     const { _id } = req.body
    //     const allAppointments = await fetchAppointment(_id)
    //     return res.json(allAppointments);
    // } catch (error) {
    //     return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    // }
}

exports.setAvailabilityController = async (req, res) => {
    
}

exports.rescheduleMtgController = async (req, res) => {
    try {
        const { _id } = req.body
        await rescheduleMtg(_id)
    } catch (error) {
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}