import React, { useState, useRef, useEffect } from "react";
import SignupImg from "../../assets/LoginImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  // validateConfirmPassword,
} from "../../utils/validators";
import authApi from "../../api/authAPI";

const Signup = () => {
  const navigate = useNavigate();
  const userInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  // const confirmPasswordInput = useRef(null);

  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  // const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    // setConfirmPasswordErr("");

    const username = userInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    // const confirmPassword = confirmPasswordInput.current.value;

    const userNameHintValidate = validateUsername(username);
    setUsernameErr(
      userNameHintValidate
        ? "Username requires minimum length of 8 characters"
        : ""
    );

    const emailHintValidate = validateEmail(email);
    setEmailErr(emailHintValidate ? "Please enter valid email address" : "");

    const passwordHintValidate = validatePassword(password);
    setPasswordErr(passwordHintValidate ? passwordHintValidate : "");

    // const confirmPasswordHintValidate = validateConfirmPassword(
    //   confirmPassword,
    //   password
    // );

    // setConfirmPasswordErr(
    //   confirmPasswordHintValidate ? confirmPasswordHintValidate : ""
    // );

    try {
      const res = await authApi.signup({
        username,
        email,
        password,
        // confirmPassword,
      });

      console.log(res);
      // localStorage.setItem("token", res.token);
      console.log("success!");
      navigate("/");
    } catch (err) {
      console.log(err);
      // const errors = err?.data.errors;
      // console.log(errors);
      // errors?.forEach((err) => {
      //   if (err.param === "username") {
      //     setUsernameErr(err.msg);
      //   }
      //   if (err.param === "email") {
      //     setEmailErr(err.msg);
      //   }
      //   if (err.param === "password") {
      //     setPasswordErr(err.msg);
      //   }
      //   // if (err.param === "confirmPassword") {
      //   //   setConfirmErrText(err.msg);
      //   // }
      // });
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue hidden md:block w-full md:w-2/3 h-screen ">
          <img src={SignupImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="bg-white w-full my-4 md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            {/* <div className="justify-center ml-auto flex mb-3">
              <img src={Logo} alt="CICCC_Logo" className="w-20 h-20 " />
            </div> */}
            <div className="text-2xl font-extrabold text-center text-blue font-second text-primary">
              Meeting Scheduling App
            </div>
            <h3 className="text-md font-bold leading-tight mt-6 text-center font-second text-accent">
              Sign up
            </h3>

            <form className="mt-6" onSubmit={handleSubmit}>
              <label className="block text-gray-700">Username</label>
              <input
                ref={userInput}
                type="username"
                name="password"
                placeholder="Enter Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />

              {usernameErr !== "" ? (
                <p className="text-xs text-red-600">{usernameErr}</p>
              ) : (
                ""
              )}

              <label className="block text-gray-700">Email</label>
              <input
                ref={emailInput}
                type="username"
                name="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />

              {emailErr !== "" ? (
                <p className="text-xs text-red-600">{emailErr}</p>
              ) : (
                ""
              )}

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  ref={passwordInput}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              {passwordErr !== "" ? (
                <p className="text-xs text-red-600">{passwordErr}</p>
              ) : (
                ""
              )}
              {/* <div className="mt-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  ref={confirmPasswordInput}
                  type="password"
                  name="confirm password"
                  placeholder="Enter Confirm password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              {confirmPasswordErr !== "" ? (
                <p className="text-xs text-red-600">{confirmPasswordErr}</p>
              ) : (
                ""
              )} */}

              <button
                type="submit"
                className="btn btn-primary normal-case font-bold w-full py-2 my-7 mr-auto"
              >
                Signup
              </button>
            </form>
            <p className="mt-8"> Already have an account?</p>
            <Link
              to="/login"
              href="#"
              className="text-blue-500 hover:opacity-70 border-b border-blue"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
