import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import comfirmed from "../../assets/confirmed.svg";
import appointmentApi from "../../api/guestAppointmentApi";
import { useDispatch, useSelector } from "react-redux";

const GuestInputForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log(user);
  const appointment = useSelector((state) => state.appointment);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);

  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setNameErr("");

    const name = nameInput.current.value;
    const email = emailInput.current.value;
    const message = messageInput.current.value;

    console.log(name);
    console.log(email);
    console.log(message);

    let error = false;
    if (name === "") {
      error = true;
      setNameErr("Please enter your name");
    }

    if (email === "" || !email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      error = true;
      setEmailErr("Please enter an invalid email");
    }

    if (error) return;

    setShowModal(true);
    console.log(showModal);
    try {
      const res = await appointmentApi({
        name,
        email,
        message,
      });

      dispatch(setAppointment(appointment));

      console.log(res);
      console.log("success!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form-control w-full md:w-10/12 md:justify-center md:mx-auto mt-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-second my-3">Enter Details</h1>
          <label className="label">
            <span className="label-text text-textBase">Name</span>
          </label>
          <input
            ref={nameInput}
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs input-primary "
          />
          {nameErr !== "" ? (
            <p className="text-xs text-red-600 pt-1">{nameErr}</p>
          ) : (
            ""
          )}
          <label className="label">
            <span className="label-text text-textBase">Email</span>
          </label>
          <input
            ref={emailInput}
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs input-primary "
          />
          {emailErr !== "" ? (
            <p className="text-xs text-red-600 pt-1">{emailErr}</p>
          ) : (
            ""
          )}
          <div className="form-control mt-3 my-5">
            <label className="label">
              <span className="label-text normal-case text-textBase">
                Please share anything that will help prepare for our meeting.
              </span>
            </label>
            <textarea
              ref={messageInput}
              type="text"
              className="textarea textarea-bordered h-24 textarea-primary"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary normal-case font-bold w-2/8 ml-auto"
            htmlFor="my-modal-4"
          >
            Schedule Event
          </button>
        </form>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-1/2 justify-center">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between pt-5">
                    <button
                      className="px-6 ml-auto bg-transparent  text-gray-500  float-right leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg "
                        viewBox="0 0 16 16"
                        onClick={() => setShowModal(false)}
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative px-6 pb-5 flex-auto">
                    <div className="block justify-center font-second text-center">
                      <h2 className="text-4xl font-bold justify-center my-4">
                        Confirmed
                      </h2>
                      <h3 className="text-lg font-bold my-2">
                        {/* You are scheduled with <span>{user.username}</span> */}
                        You are scheduled with Test!
                      </h3>
                    </div>
                    <img
                      src={comfirmed}
                      className="w-1/2 h-1/2 object-cover my-7 mx-auto"
                    />
                    <div className="flex items-center my-3">
                      <div>
                        <h2 className="mx-1 my-2">
                          <FaRegCalendarAlt />
                        </h2>
                      </div>
                      <div className="mx-1 my-2">
                        <h2>Friday, Mar 10 2023</h2>
                        <h2>10:00 - 10:30</h2>
                        <h2>{appointment.date}</h2>
                      </div>
                    </div>
                    <div className="flex items-center my-3 md:border-b-0">
                      <h2 className="mx-1 my-3">
                        <BsGlobeAmericas />
                      </h2>
                      <h2 className="mx-1">Pacific Time - US / Canada</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default GuestInputForm;
