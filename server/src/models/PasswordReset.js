const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const PasswordResetSchema = new Schema({
    email: { type: String, trim: true, required: true },
    token: { type: String, trim: true, required: true }
}, {
    timestamps: true,
})


module.exports = model('PasswordReset', PasswordResetSchema)