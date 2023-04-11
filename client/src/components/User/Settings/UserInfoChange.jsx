import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlice";
import { useParams } from "react-router-dom";
import { validateUsername, validateEmail } from "../../../utils/validators";
import userSettingApi from "../../../api/userSettingApi";

const UserInfoChange = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const param = useParams();
  const userInput = useRef(null);
  const emailInput = useRef(null);

  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState("");

  const [successUsername, setSuccessUsername] = useState(false);
  const [successEmail, setSuccessEmail] = useState(false);

  const handleAccountInfoChange = async (e) => {
    e.preventDefault();

    let error = false;
    console.log(user.username);

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
      const res = await userSettingApi.updateUserInfo(param.uid, {
        username,
        email,
      });

      console.log(res.data[0]);

      if (res.status === 200) {
        const newObj = {};
        newObj.username = res.data[0].username;
        newObj.email = res.data[0].email;
        console.log(newObj.username);
        console.log(user.username);

        if (newObj.username !== user.username) {
          setSuccessUsername(true);
        }
        if (newObj.email !== user.email) {
          setSuccessEmail(true);
        }
        dispatch(setUser(newObj));
      }
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

            {usernameErr !== "" && (
              <p className="text-xs text-red-600">{usernameErr}</p>
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

            {emailErr !== "" && (
              <p className="text-xs text-red-600">{emailErr}</p>
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
      <div className="toast toast-top toast-start">
        {successUsername ? (
          <div className="alert alert-success">
            <div>
              <span>Username Changed!</span>
            </div>
          </div>
        ) : (
          ""
        )}
        {successEmail ? (
          <div className="alert alert-success">
            <div>
              <span>Email Changed!</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserInfoChange;
