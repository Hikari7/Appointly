import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validators";
import userSettingApi from "../../../api/userSettingApi";
import SuccessToast from "../../Elements/Toast/ToastSuccess";
import ErrorToast from "../../Elements/Toast/ToastError";

const PasswordChange = () => {
  const param = useParams();
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordErr("");
    setConfirmPasswordErr("");
    let error = false;
    let password = passwordInput.current.value;
    let confirmPassword = confirmPasswordInput.current.value;

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
      const res = await userSettingApi.updatePassword(param.uid, {
        password: confirmPassword,
      });
      if (res.status === 200) {
        setSuccess(true);
        passwordInput.current.value = ""
        confirmPasswordInput.current.value = ""

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err, err.message);
      setError(true);
    }
  };

  return (
    <>
      <div className="text-xl font-bold leading-tight mt-10 text-center font-second text-accent">
        Password settings
      </div>
      <form className="mt-6" onSubmit={handlePasswordChange}>
        <div className="md:flex justify-between">
          <div className="md:w-5/12">
            <label className="block text-gray-700 mt-2 font-second">New Password</label>
            <input
              ref={passwordInput}
              type="password"
              name="password"
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />

            {passwordErr !== "" && <p className="text-xs text-red-600">{passwordErr}</p>}
          </div>
          <div className="md:w-5/12">
            <label className="block text-gray-700 mt-2 font-second">Confirm Password</label>
            <input
              ref={confirmPasswordInput}
              type="password"
              name="confirm password"
              placeholder="Enter Confirm password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            {confirmPasswordErr !== "" && <p className="text-xs text-red-600">{confirmPasswordErr}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary normal-case font-bold py-2 my-7 font-second"
        >
          Save changes
        </button>
      </form>

      {success && (
        <SuccessToast props={"Password changed!"} setFunction={setSuccess} />
      )}
      {error && (
        <ErrorToast props={"Something went wrong!"} setFunction={setError} />
      )}
    </>
  );
};

export default PasswordChange;
