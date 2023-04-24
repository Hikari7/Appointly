const { ObjectId } = require("bson");

const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.bookMtg = async (bookData) => {
  const userId = new ObjectId(bookData.newObj.hostUser);
  bookData.newObj.hostUser = userId;
  const newMtg = new Appointment(bookData.newObj);
  const newAppointment = await newMtg.save();
  const userInfo = await User.findOne({_id: userId})

  return (
    data = {
      username: userInfo.username,
      email: userInfo.email,
      guestName: newAppointment.name,
      guestEmail: newAppointment.email,
      message: newAppointment.message,
    }
  )
};
