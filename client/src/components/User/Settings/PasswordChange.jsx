import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlice";
import { useNavigate } from "react-router-dom";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validators";
import userSettingApi from "../../../api/userSettingApi";

const PasswordChange = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);

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

    try {
      setSuccess(true);
      const res = await userSettingApi.reset({
        // password,
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
      <div className="mt-8">
        <h3 className="text-xl font-bold leading-tight mt-6 text-center font-second text-accent">
          Change your password
        </h3>
        <form className="mt-6" onSubmit={handlePasswordChange}>
          <div className="md:flex justify-between">
            <div className="md:w-5/12">
              <label className="block text-gray-700">New Password</label>
              <input
                // defaultValue={user.password}
                ref={passwordInput}
                type="password"
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
            <div className="md:w-5/12 mt-2">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                // defaultValue={user.password}
                ref={confirmPasswordInput}
                type="password"
                name="confirm password"
                placeholder="Enter Confirm password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              {confirmPasswordErr !== "" ? (
                <p className="text-xs text-red-600">{confirmPasswordErr}</p>
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
      {message}
    </>
  );
};

export default PasswordChange;
