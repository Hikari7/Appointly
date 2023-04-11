const { bookMtg } = require("../middleware/appointment.service");

exports.registerMtgController = async (req, res) => {
  try {
    const userInfo = await bookMtg(req.body);
    return res.json(userInfo)
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ errorMessage: "Something went wrong. Please try again." });
  }
};
