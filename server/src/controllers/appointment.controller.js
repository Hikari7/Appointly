const { bookMtg } = require("../middleware/appointment.service");

exports.registerMtgController = async (req, res) => {
  try {
    console.log(req.body);
    await bookMtg(req.body.data);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ errorMessage: "Something went wrong. Please try again." });
  }
};
