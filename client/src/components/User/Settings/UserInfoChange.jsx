import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlice";
import { useNavigate } from "react-router-dom";
import { validateUsername, validateEmail } from "../../../utils/validators";
import userSettingApi from "../../../api/userSettingApi";

const UserInfoChange = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInput = useRef(null);
  const emailInput = useRef(null);

  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (success == true) {
      setMessage(
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <div>
              <span>Password Changed!</span>
            </div>
          </div>
        </div>
      );
    } else {
      setMessage(null);
    }
  }, [success]);

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
      setSuccess(true);
      const res = await userSettingApi.update({
        // username,
        // email,
      });

      dispatch(setUser(user));

      console.log(res);

      console.log("success!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err, err.message);
    }
  };

  return (
    <>
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
            <label className="block text-gray-700 mt-2 md:mt-0">Email</label>
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
      {message}
    </>
  );
};

export default UserInfoChange;
