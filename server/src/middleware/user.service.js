const Appointment = require("../models/Appointment");

exports.fetchAppointment = async (id) => {
    return await Appointment.find({ hostUser: id })

    // try {
    //     return await Appointment.find({ hostUser: id })
    // } catch (error) {
    //     const errorObj = new Error("Failed to fetch the appointment data.");
    //     errorObj.status = 404
    //     throw errorObj
    // }
}

exports.rescheduleMtg = async (mtgId) => {
    return await Appointment.find({ _id: mtgId })

    // try {
    //     // Code for update appointment

    // } catch (error) {
    //     const errorObj = new Error("Failed to fetch the appointment data.");
    //     errorObj.status = 404
    //     throw errorObj
    // }
}

exports.deleteMtg = async (mtgId) => {
    return await Appointment.find({ _id: mtgId })

    // try {
    //     // Code for update appointment
        
    // } catch (error) {
    //     const errorObj = new Error("Failed to fetch the appointment data.");
    //     errorObj.status = 404
    //     throw errorObj
    // }
}

