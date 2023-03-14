const { rescheduleMtg } = require('../middleware/user.service')

exports.rescheduleMtgController = async (req, res) => {
    try {
        const { _id } = req.body
        await rescheduleMtg(_id)
    } catch (error) {
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
}