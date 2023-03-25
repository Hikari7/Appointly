const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const AvailabilitySchema = new Schema({
    userId: { type: SchemaTypes.ObjectId, ref: "User" },
    weekly: [{
        dow: String,
        time: []
    }],
    daily: [{
        date: String,
        time: []
    }],
}, {
    timestamps: true,
})


module.exports = model('Availability', AvailabilitySchema)

