import React from "react";
import { useSelector } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import GuestInputForm from "./GuestInputForm";
import { useParams } from "react-router-dom";

import moment from "moment";

const GuestForm = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.user.user);
  const appointment = useSelector((state) => state.appointment.appointment);

  const formattedDate = moment(appointment.appointmentDateTime.date).format("MMM DD, YYYY")
  const appointmentStartTime = moment(appointment.appointmentDateTime.time)._i
  const appointmentEndTime = moment(`2023-4-15 ${appointment.appointmentDateTime.time}`).add(30, "m").format("HH:mm")



  return (
    <>
      <div className="md:flex">
        <div className="md:border-r">
          <div className=" md:mt-32">
            <div className="my-3">
              <h2 className="my-3 text-left font-second">30 Minute Meeting</h2>
            </div>
            <div className="justify-between mx-auto my-3">
              <div className="flex  items-center">
                <div>
                  <h2 className="mx-1">
                    <FaRegCalendarAlt />
                  </h2>
                </div>
                <div className="mx-1 text-primary">
                  <h2>{formattedDate}</h2>
                  <h2>{`${appointmentStartTime} - ${appointmentEndTime}`}</h2>
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
