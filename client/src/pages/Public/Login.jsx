import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PrimaryBtn from "../../components/Elements/Button/PrimaryBtn";
import LoginImg from "../../assets/LoginImg.jpg";
import authApi from "../../api/authAPI";

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const userInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);

  // useEffect(() => {
  //   if (usernameErr === "" && passwordErr === "") {
  //     alert("Sign up successful!");
  //   }
  // }, [usernameErr, passwordErr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");

    const username = userInput.current.value;
    const email = passwordInput.current.value;
    const password = passwordInput.current.value;

    //validation
    let error = false;
    if (username === "") {
      error = true;
      setUsernameErr("Please enter your name");
    }
    if (email === "") {
      error = true;
      setEmailErr("Please enter your email");
    }
    if (password === "") {
      error = true;
      setPasswordErr("Please enter your password");
    }

    //userなのかを判断するロジックも書かなきゃいけない

    try {
      const res = await authApi.login({
        username,
        email,
        password,
      });
      console.log(res);
      console.log("success to login!");
      // navigate("/:uid/appointment");
    } catch (err) {
      console.log(err);

      // const errors = err?.data.errors;

      // errors?.forEach((err) => {
      //   if (err.param === "username") {
      //     setUsernameErr(err.msg);
      //   }
      //   if (err.param === "email") {
      //     setUsernameErr(err.msg);
      //   }
      //   if (err.param === "password") {
      //     setUsernameErr(err.msg);
      //   }
      // });
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue hidden md:block w-full md:w-2/3 h-screen">
          <img src={LoginImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="bg-white w-full my-4 md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            {/* <div className="justify-center ml-auto flex mb-3">
              <img src={Logo} alt="CICCC_Logo" className="w-20 h-20 " />
            </div> */}
            <div className="text-2xl font-extrabold text-center text-blue font-second">
              Meeting Scheduling App
            </div>
            <h3 className="text-md font-bold leading-tight mt-6 text-center font-5xl font-second">
              Log in
            </h3>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  ref={userInput}
                  type="username"
                  name="username"
                  placeholder="Enter Username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              {usernameErr !== "" ? (
                <p className="text-xs text-red-600">{usernameErr}</p>
              ) : (
                ""
              )}
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
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              {passwordErr !== "" ? (
                <p className="text-xs text-red-600">{passwordErr}</p>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="btn btn-primary normal-case font-bold w-full py-2 my-7 mr-auto"
              >
                Login
              </button>
            </form>
            <p className="mt-8">You don't have an account yet?</p>
            <Link
              to="/signup"
              className="text-blue-500 hover:opacity-70 border-b border-blue"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
