import React from "react";

const GuestInputForm = () => {
  return (
    <>
      <div className="form-control w-full md:w-10/12 md:justify-center md:mx-auto mt-6">
        <h1 className="text-3xl font-second my-3">Enter Details</h1>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs input-primary "
        />
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs input-primary "
        />
        <div className="form-control my-3">
          <label className="label">
            <span className="label-text normal-case">
              Please share anything that will help prepare for our meeting.
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 textarea-primary"
            placeholder="Bio"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default GuestInputForm;
