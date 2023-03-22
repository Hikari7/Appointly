const { ObjectId } = require("mongodb");
const Appointment = require("../models/Appointment");

exports.bookMtg = async (bookData) => {
  const userId = new ObjectId(bookData.newObj.hostUser);
  bookData.newObj.hostUser = userId;
  console.log(bookData);
  const newMtg = new Appointment(bookData.newObj);
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
