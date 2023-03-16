import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import GuestInputForm from "./GuestInputForm";

const GuestForm = () => {
  // const user = useSelector((state) => state.user);

  return (
    <>
      <div className="md:flex">
        <div className="md:border-r">
          <div className=" md:mt-32">
            <div className="my-3">
              <h1 className="text-3xl font-second">Test</h1>
              <h2 className="my-3">30 Minute Meeting</h2>
            </div>
            <div className="justify-between mx-auto my-3">
              <div className="flex items-center">
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
              <div className="flex items-center my-3 border-b md:border-b-0">
                <h2 className="mx-1 my-3">
                  <BsGlobeAmericas />
                </h2>
                <h2 className="mx-1">Pacific Time - US / Canada</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-full my-3">
          <GuestInputForm />
        </div>
      </div>
    </>
  );
};

export default GuestForm;
