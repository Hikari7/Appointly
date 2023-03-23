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
                <div className="flex items-start justify-between pt-5"></div>
                <div className="relative px-6 pb-5 flex-auto">
                  <div className="block justify-center font-second text-center">
                    <h2 className="text-4xl font-bold justify-center my-4 md:text-5xl">
                      Confirmed
                    </h2>
                    <h3 className="text-sm font-bold my-2 md:text-xl">
                      {/* You are scheduled with <span>{user.username}</span> */}
                      You are scheduled with Test!
                    </h3>
                    <h2 className="text-xs font-bold md:text-lg">
                      You're host will contact you shortly.
                    </h2>
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
