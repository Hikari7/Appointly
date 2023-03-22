import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import comfirmed from "../../../assets/confirmed.svg";

const guestInputModal = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  return (
    <>
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
                    <h2 className="text-4xl font-bold justify-center my-4 md:text-5xl">
                      Confirmed
                    </h2>
                    <h3 className="text-lg font-bold my-2 md:text-3xl">
                      {/* You are scheduled with <span>{user.username}</span> */}
                      You are scheduled with Test!
                    </h3>
                  </div>
                  <img
                    src={comfirmed}
                    className="w-1/2 h-1/2 object-cover my-7 mx-auto md:max-h-56 md:max-w-fit"
                  />
                  <div className="md:flex md:justify-between md:w-11/12 mx-auto">
                    <div className="flex items-center my-3  md:text-xl">
                      <div>
                        <h2 className="mx-1 my-2">
                          <FaRegCalendarAlt />
                        </h2>
                      </div>
                      <div className="mx-1 my-2">
                        <h2>Friday, Mar 10 2023</h2>
                        <h2>10:00 - 10:30</h2>
                        {/* <h2>{appointment.date}</h2> */}
                      </div>
                    </div>
                    <div className="flex items-center my-3 md:border-b-0 md:text-xl">
                      <h2 className="mx-1 my-3">
                        <BsGlobeAmericas />
                      </h2>
                      <h2 className="mx-1">Pacific Time - US / Canada</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default guestInputModal;
