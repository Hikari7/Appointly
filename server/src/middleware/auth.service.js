const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = Number(process.env.SALT);
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");

exports.signUp = async (username, email, password) => {
    let user = await User.findOne({ email });

    // Check user existing
    if (user) {
      const errorObj = new Error("Email already exists");
      errorObj.status = 404;
      throw errorObj
      // return errorObj;
    }

    // Create new user
    user = new User({ username, email, password });
    await user.save();
    const token = JWT.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

    return (data = {
      userId: user._id,
      username: user.username,
      token,
    });
};

exports.login = async (email, password) => {
  try {
    let user = await User.findOne({ email }).lean()

    // Check user existing
    if (!user) {
      const errorObj = new Error("User does not exists.");
      errorObj.status = 404;
      throw errorObj;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = JWT.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

      return (data = {
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      const errorObj = new Error("Incorrect credentials.");
      throw errorObj;
    }
  } catch (error) {
    const errorObj = new Error("Something went wrong. Please try again.");
    throw errorObj;
  }
  
  // try {
  //   let user = await User.findOne({ email }).lean();

  //   // Check user existing
  //   if (!user) {
  //     const errorObj = new Error("User does not exists.");
  //     errorObj.status = 404;
  //     throw errorObj;
  //   }

  //   const isValid = await bcrypt.compare(password, user.password);

  //   if (isValid) {
  //     const token = JWT.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

  //     return (data = {
  //       userId: user._id,
  //       username: user.username,
  //       email: user.email,
  //       token,
  //     });
  //   } else {
  //     const errorObj = new Error("Incorrect credentials.");
  //     throw errorObj;
  //   }
  // } catch (error) {
  //   const errorObj = new Error("Something went wrong. Please try again.");
  //   throw errorObj;
  // }
};
