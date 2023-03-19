const { ObjectId } = require('mongodb')

const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

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

exports.setAvailability = async (data) => {
    const userId = new ObjectId("64163374a2409176fff88fc2")
    try {
        const targetAvailability = await Availability.findOneAndUpdate({hostUser: data.userId}, {
            $set: { "weekly": data.weekly, "daily": data.daily }
        })

        if(!targetAvailability){
            data.userId = userId
            const newAvailability = new Availability(data)
            return await newAvailability.save()
        }
        
        return await Availability.findOne({userId})

    } catch (error) {
        console.log(error);
    }
}

exports.rescheduleMtg = async (data) => {
    const MTGId = new ObjectId("64177539a2f0b954a1a32322")

    try {
        await Appointment.findOneAndUpdate({ _id: data.mtgID }, {
            $set: { "appointmentDateTime":  data.appointmentDateTime }
        })
        return await Appointment.findOne(MTGId)
    } catch (error) {
        console.log(error);
    }
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

