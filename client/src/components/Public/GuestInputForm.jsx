import React, { useState } from "react";
// import ConfirmedModal from "../Elements/Modal/ConfirmedModal";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import comfirmed from "../../assets/confirmed.svg";

const GuestInputForm = () => {
  const handleSubmit = () => {
    console.log("caascasc");
  };

  return (
    <>
      <div className="form-control w-full md:w-10/12 md:justify-center md:mx-auto mt-6">
        <h1 className="text-3xl font-second my-3">Enter Details</h1>
        <label className="label">
          <span className="label-text text-textBase">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs input-primary "
        />
        <label className="label">
          <span className="label-text text-textBase">Email</span>
        </label>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs input-primary "
        />
        <div className="form-control mt-3 my-5">
          <label className="label">
            <span className="label-text normal-case text-textBase">
              Please share anything that will help prepare for our meeting.
            </span>
          </label>
          <textarea className="textarea textarea-bordered h-24 textarea-primary"></textarea>
        </div>
        <label
          htmlFor="my-modal-4"
          className="btn btn-primary normal-case font-bold w-2/8 ml-auto"
          onClick={handleSubmit}
        >
          Schedule Event
        </label>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="block justify-center font-second text-center">
              <h2 className="text-3xl font-bold justify-center ">Confirmed</h2>
              <h3 className="text-lg font-bold">
                You are scheduled with Test!
              </h3>
            </div>
            <div className="flex items-center my-3">
              <div>
                <h2 className="mx-1">
                  <FaRegCalendarAlt />
                </h2>
              </div>
              <div className="mx-1">
                <h2>Friday, Mar 10 2023</h2>
                <h2>10:00 - 10:30</h2>
              </div>
            </div>
            <div className="flex items-center my-3 md:border-b-0">
              <h2 className="mx-1 my-3">
                <BsGlobeAmericas />
              </h2>
              <h2 className="mx-1">Pacific Time - US / Canada</h2>
            </div>
            <img
              src={comfirmed}
              className="w-1/2 h-1/2 object-cover my-7 mx-auto"
            />
            <p className="py-4 text-center">
              A calendar invitation has been sent to your email address.
            </p>
          </label>
        </label>
      </div>
    </>
  );
};

export default GuestInputForm;
