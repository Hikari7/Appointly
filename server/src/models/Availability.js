const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const AvailabilitySchema = new Schema({
    hostUser: { type: SchemaTypes.ObjectId, ref: "User" },
    weekly: [],
    daily: [{
        dow: String,
        time: [String]
    }],
}, {
    timestamps: true,
})


module.exports = model('Availability', AvailabilitySchema)

