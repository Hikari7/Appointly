const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability")

exports.rescheduleMtg = async (mtgId) => {
    try {
        const avail = await Availability.find({})
        console.log(avail);
        return await Appointment.find({ _id: mtgId })
        // Code for update appointment

    } catch (error) {
        const errorObj = new Error("Failed to fetch the appointment data.");
        errorObj.status = 404
        throw errorObj
    }
}

exports.deleteMtg = async (mtgId) => {
    try {
        return await Appointment.find({ _id: mtgId })
        // Code for update appointment
        
    } catch (error) {
        const errorObj = new Error("Failed to fetch the appointment data.");
        errorObj.status = 404
        throw errorObj
    }
}