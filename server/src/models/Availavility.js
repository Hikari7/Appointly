const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const AvailabilitySchema = new Schema({
    hostUser: { type: SchemaTypes.ObjectId, ref: "User" },
    weekly: { 
        dow: {type: String, trim: true, required: true},
        time: {type: String, trim: true, required: true} 
    },
    daily: { 
        dow: {type: String, trim: true, required: true},
        time: {type: String, trim: true, required: true} 
    },
}, {
    timestamps: true,
})


module.exports = model('Availability', AvailabilitySchema)