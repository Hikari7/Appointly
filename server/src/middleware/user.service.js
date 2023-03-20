const { ObjectId } = require('mongodb')

const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

exports.fetchAppointment = async (uid) => {
    const userId = new ObjectId(uid)
    return await Appointment.find({ hostUser: userId })

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

exports.rescheduleMtg = async (appointmentid, changedDateTime) => {
    const appointmentId = new ObjectId(appointmentid)

    try {
        await Appointment.findOneAndUpdate({ _id: appointmentId }, {
            $set: { "appointmentDateTime":  changedDateTime }
        })
        return await Appointment.findOne(appointmentId)
    } catch (error) {
        console.log(error);
    }
}

exports.deleteAppointment = async (appointmentid) => {
    console.log(appointmentid);
    const appointmentId = new ObjectId(appointmentid)
    return await Appointment.findOneAndDelete({ _id: appointmentId })
}

