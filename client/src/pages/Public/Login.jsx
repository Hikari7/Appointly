import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import LoginImg from "../../assets/LoginImg.jpg";
import ErrorToast from "../../components/Elements/Toast/ToastError";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [error, setError] = useState(false);

  const { mutate, isLoading } = useLogin(setError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setPasswordErr("");

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    let error = false;
    if (email === "") {
      error = true;
      setEmailErr("Please enter your email");
    }
    if (password === "") {
      error = true;
      setPasswordErr("Please enter your password");
    }

    // Call login api
    mutate({ email, password });
  };

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue hidden md:block w-full md:w-2/3 h-screen">
          <img src={LoginImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="bg-white w-full my-4 md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            <div className="text-2xl font-extrabold text-center text-blue font-second text-primary">
              Appointly
            </div>
            <div className="text-md font-extrabold text-center text-blue font-second text-primary">
              Meeting Scheduling App
            </div>

            <div className="text-xl font-bold leading-tight mt-6 text-center font-5xl font-second text-accent">
              Log in
            </div>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block text-gray-700">Email</label>
                <input
                  ref={emailInput}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              {emailErr !== "" && (
                <p className="text-xs text-red-600">{emailErr}</p>
              )}

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  ref={passwordInput}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              {passwordErr !== "" && (
                <p className="text-xs text-red-600">{passwordErr}</p>
              )}

              <button
                type="submit"
                className={`btn btn-primary normal-case font-bold w-full py-2 my-7 mr-auto ${
                  isLoading && "loading"
                }`}
              >
                Login
              </button>
            </form>
            <p className="mt-8">You don't have an account yet?</p>
            <Link
              to="/signup"
              className="text-primary hover:opacity-70 border-b border-primary"
            >
              Create an account
            </Link>
          </div>
        </div>
        {error && (
          <ErrorToast
            props={"Incorrect Email or password"}
            setFunction={setError}
          />
        )}
      </section>
    </>
  );
};

export default Login;
