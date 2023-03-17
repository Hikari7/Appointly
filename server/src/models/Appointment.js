const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const AppointmentSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    appointmentDate: { 
        date: {type: String, trim: true, required: true},
        time: {type: String, trim: true, required: true} 
    },
    hostUser: { type: SchemaTypes.ObjectId, ref: "User" }
}, {
    timestamps: true,
})


module.exports = model('Appointment', AppointmentSchema)