const { ObjectId } = require('mongodb')

const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

exports.fetchAppointment = async (uid) => {
    const userId = new ObjectId(uid)
    return await Appointment.find({ hostUser: userId })
}

exports.fetchUserAvailability = async (uid) => {
    const userId = new ObjectId(uid)
    return await Availability.find({userId})
}

exports.setAvailability = async (uid, data) => {
    const userId = new ObjectId(uid)
    try {   
        if(data.daily.length > 0){
            // Setting for daily availability.            
            // Check if the date which will be overwritten is already exist in the daily array.
            const allDailyAvailability = await Availability.find({"daily.date": data.daily[0].date})
            if(allDailyAvailability.length > 0){
                // Remove the existing date field
                await Availability.findOneAndUpdate({userId}, {
                    $pull: {daily: {date: data.daily[0].date}}
                })
                // Then push the new object.
                const targetAvailability = await Availability.findOneAndUpdate({userId}, {
                    $push: { "daily": data.daily[0] }
                })

                // If the availability document does not exist, create new document
                if(!targetAvailability){
                    data.userId = userId
                    const newAvailability = new Availability(data)
                    return await newAvailability.save()
                }
            }else{
                // If the date that will be overeritten is not exist on current daily availability, just push object.
                await Availability.findOneAndUpdate({userId}, {
                    $push: { "daily": data.daily[0] }
                })
            }
        }else if(data.weekly.length > 0){
            // Setting for weekly availability.
            const targetAvailability = await Availability.findOneAndUpdate({userId}, {
                $set: { "weekly": data.weekly }
            })
            //If the availability document does not exist, create new document.
            if(!targetAvailability){
                data.userId = userId
                const newAvailability = new Availability(data)
                return await newAvailability.save()
            }
        }
        else if(data.daily.time.length === 0){
            // The case of unavailable.
            // Check if the date which will be overwritten is already exist in the daily array.
            const allDailyAvailability = await Availability.find({"daily.date": data.daily.date})
            if(allDailyAvailability.length > 0){
                // Remove the existing date field
                await Availability.findOneAndUpdate({userId}, {
                    $pull: {daily: {date: data.daily.date}}
                })
                // Then push the empty time array.
                const targetAvailability = await Availability.findOneAndUpdate({userId}, {
                    $push: { "daily": {date: data.daily.date, time: [{start: "", end: ""}]} }
                })

                // If the availability document does not exist, create new document of selected date with empty time array.
                if(!targetAvailability){
                    data.userId = userId
                    const newAvailability = new Availability({date: data.daily[0].date, time: [{start: "", end: ""}]})
                    return await newAvailability.save()
                }
            }else{
                // If the date that will be overeritten is not exist on current daily availability, just push object.
                await Availability.findOneAndUpdate({userId}, {
                    $push: { "daily": data.daily[0] }
                })
            }
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
    const appointmentId = new ObjectId(appointmentid)
    return await Appointment.findOneAndDelete({ _id: appointmentId })
}

