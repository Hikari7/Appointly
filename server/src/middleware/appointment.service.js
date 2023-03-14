const Appointment = require("../models/Appointment")

exports.fetchAppointment = async (id) => {
    try {
        return await Appointment.find({ hostUser: id })
    } catch (error) {
        const errorObj = new Error("Failed to fetch the appointment data.");
        errorObj.status = 404
        throw errorObj
    }
}

exports.guestFormMtg = async (guestFormMtg) => {
    try {
        const newMtg = new Appointment(guestFormMtg)
        await newMtg.save()
    } catch (error) {
        console.log(error);
        const errorObj = new Error("Failed to book the meeting.");
        errorObj.status = 404
        throw errorObj
    }
}