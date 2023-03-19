const { bookMtg } = require('../middleware/appointment.service')


exports.registerMtgController = async (req, res) => {
    try {
        await bookMtg(req.body)
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    }
    
    // try {
    //     await guestFormMtg(req.body)
    // } catch (error) {
    //     return res.status(400).send({errorMessage: "Something went wrong. Please try again."});
    // }
}


