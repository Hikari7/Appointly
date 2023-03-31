import React, { useState, useRef } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import { useDispatch, useSelector } from "react-redux";
import settingImg from "../../assets/setting.svg";
import { setUser } from "../../redux/slicers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";
import { legacy_createStore } from "@reduxjs/toolkit";

const Settings = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);

  const handleAccountInfoChange = async (e) => {
    e.preventDefault();
    setUsernameErr("");
    setEmailErr("");

    let error = false;

    const username = userInput.current.value;
    const email = emailInput.current.value;

    const userNameHintValidate = validateUsername(username);
    setUsernameErr(userNameHintValidate ? userNameHintValidate : "");
    if (userNameHintValidate) {
      error = true;
    }

    const emailHintValidate = validateEmail(email);
    setEmailErr(emailHintValidate ? emailHintValidate : "");
    if (emailHintValidate) {
      error = true;
    }

    if (error) return;

    try {
      const res = await authApi.signup({
        username,
        email,
      });

      dispatch(setUser(user));

      console.log(res);
      
      console.log("success!");
      navigate("/login");
    } catch (err) {
      console.log(err, err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordErr("");
    setConfirmPasswordErr("");
    let error = false;
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;

    const passwordHintValidate = validatePassword(password);
    setPasswordErr(passwordHintValidate ? passwordHintValidate : "");
    if (passwordHintValidate) {
      error = true;
    }

    const confirmPasswordHintValidate = validateConfirmPassword(
      confirmPassword,
      password
    );

    setConfirmPasswordErr(
      confirmPasswordHintValidate ? confirmPasswordHintValidate : ""
    );
    if (confirmPasswordHintValidate) {
      error = true;
    }

    if (error) return;

    // try {
    //   const res = await authApi.signup({
    //     username,
    //     email,
    //     password,
    //   });

    //   dispatch(setUser(user));

    //   console.log(res);
    //   console.log("success!");
    //   navigate("/login");
    // } catch (err) {
    //   console.log(err, err.message);
    // }
  };
  return (
    <>
      <div className="md:flex md:w-93 ">
        <TitleWrapper>
          <h1 className="text-3xl font-second md:w-10/12 mx-auto">
            Account settings
          </h1>
          <img
            src={settingImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-10/12 md:h-60"
          />
          {/* <h1Check>{user.username}</h1Check> */}
          <h3> See your account information</h3>
        </TitleWrapper>

        <div className="mt-14 md:w-5/6 w-full">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-white w-full my-4 md:mx-auto md:w-2/3 px-6 flex items-center justify-center">
              <div className="w-full">
                <h3 className="text-xl font-bold leading-tight mt-6 text-center font-second text-accent">
                  Account information
                </h3>
                <form className="mt-6" onSubmit={handleAccountInfoChange}>
                  <div className="md:flex justify-between">
                    <div className="md:w-5/12">
                      <label className="block text-gray-700">Username</label>
                      <input
                        defaultValue={user.username}
                        ref={userInput}
                        type="username"
                        name="password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      />

                      {usernameErr !== "" ? (
                        <p className="text-xs text-red-600">{usernameErr}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="md:w-5/12">
                      <label className="block text-gray-700 mt-2 md:mt-0">
                        Email
                      </label>
                      <input
                        defaultValue={user.email}
                        ref={emailInput}
                        type="username"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      />

                      {emailErr !== "" ? (
                        <p className="text-xs text-red-600">{emailErr}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary normal-case font-bold py-2 my-7 "
                  >
                    Save changes
                  </button>
                </form>
                <div className="mt-8">
                  <h3 className="text-xl font-bold leading-tight mt-6 text-center font-second text-accent">
                    Change your password
                  </h3>
                  <form className="mt-6" onSubmit={handlePasswordChange}>
                    <div className="md:flex justify-between">
                      <div className="md:w-5/12">
                        <label className="block text-gray-700">
                          New Password
                        </label>
                        <input
                          // defaultValue={user.password}
                          ref={passwordInput}
                          // type="password"
                          name="password"
                          placeholder="New Password"
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        />

                        {passwordErr !== "" ? (
                          <p className="text-xs text-red-600">{passwordErr}</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="md:w-5/12">
                        <label className="block text-gray-700">
                          Confirm Password
                        </label>
                        <input
                          // defaultValue={user.password}
                          ref={confirmPasswordInput}
                          type="password"
                          name="confirm password"
                          placeholder="Enter Confirm password"
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        />
                        {confirmPasswordErr !== "" ? (
                          <p className="text-xs text-red-600">
                            {confirmPasswordErr}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary normal-case font-bold py-2 my-7 "
                    >
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
