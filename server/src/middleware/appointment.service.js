const { ObjectId } = require("mongodb");
const Appointment = require("../models/Appointment");

exports.bookMtg = async (bookData) => {
  const userId = new ObjectId(bookData.hostUser);
  bookData.hostUser = userId;
  const newMtg = new Appointment(bookData);
  await newMtg.save();

  // try {
  //     const newMtg = new Appointment(guestFormMtg)
  //     await newMtg.save()
  // } catch (error) {
  //     console.log(error);
  //     const errorObj = new Error("Failed to book the meeting.");
  //     errorObj.status = 404
  //     throw errorObj
  // }
};
