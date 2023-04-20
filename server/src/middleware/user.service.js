const { ObjectId } = require('bson')
const bcrypt = require("bcrypt");

const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const User = require('../models/User');

const rescheduleEmail = require('../utils/nodemailer/rescheduleMail')

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
        // Check if user already have availability document.
        const userAvailability = await Availability.find({userId})
        // If exists,
        if(userAvailability.length > 0){
            // Setting for daily availability.            
            if(data.target === "daily"){
                // Check if the date which will be overwritten is already exist in the daily array.
                const allDailyAvailability = await Availability.find({"daily.date": data.daily[0].date})
                // If exists,
                if(allDailyAvailability.length > 0){
                    // Setting for unavailable.
                    if(data.daily[0].time.length === 0){
                        // Remove the existing date field
                        await Availability.findOneAndUpdate({userId}, {
                            $pull: {daily: {date: data.daily[0].date}}
                        })
                        // Then push the empty time array.
                        await Availability.findOneAndUpdate({userId}, {
                            $push: { "daily": {date: data.daily[0].date, time: [{start: "", end: ""}]} }
                        })
                    // Setting for overwrite.
                    }else{
                        // Remove the existing date field
                        await Availability.findOneAndUpdate({userId}, {
                            $pull: {daily: {date: data.daily[0].date}}
                        })
                        // Then push the new object.
                        const targetAvailability = await Availability.findOneAndUpdate({userId}, {
                            $push: { "daily": data.daily[0] }
                        }) 
                    }
                // Case for target date is not exists. Add new date time obj.
                }else{
                    // Setting for unavailability.
                    if(data.daily[0].time.length === 0){
                        await Availability.findOneAndUpdate({userId}, {
                            $push: { "daily": {date: data.daily[0].date, time: [{start: "", end: ""}]} }
                        }) 
    
                    // Setting for overwrite.                
                    }else{
                        await Availability.findOneAndUpdate({userId}, {
                            $push: { "daily": data.daily[0] }
                        }) 
                    }
                }
            // Setting for weekly availability.
            }else{
                await Availability.findOneAndUpdate({userId}, {
                    $set: { "weekly": data.weekly }
                })
                }
            return await Availability.findOne({userId})
        //If the availability document does not exist, create new document.
        }else{
            data.userId = userId
            const newAvailability = new Availability({userId, weekly: data.weekly, daily: data.daily})
            return await newAvailability.save()
        }
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

        const mtgInfo = await Appointment.findOne({_id: appointmentid}).lean()
        const host = await User.findOne({_id: mtgInfo.hostUser})
        rescheduleEmail.sendRescheduleEmail(host, mtgInfo)

        return await Appointment.findOne(appointmentId)

    } catch (error) {
        console.log(error);
    }
}   

exports.deleteAppointment = async (appointmentid) => {
    const appointmentId = new ObjectId(appointmentid)
    return await Appointment.findOneAndDelete({ _id: appointmentId })
}

exports.updateUsername = async (uid, data) => {
    const userId = new ObjectId(uid)
    await User.findByIdAndUpdate({ _id: userId }, {
        $set: {username: data.username, email: data.email}
    })
    return await User.find({ _id: userId })
}

exports.updatePassward = async (uid, data) => {
    const userId = new ObjectId(uid)
    const hashedPassword = await bcrypt.hash(data.password, 10)
    await User.findByIdAndUpdate({ _id: userId }, {
        $set: {password: hashedPassword}
    })
    return await User.find({ _id: userId })
}
