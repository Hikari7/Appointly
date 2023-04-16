import { useState } from "react";
import { HashLink } from "react-router-hash-link";

import RescheduleModal from "../Modal/RescheduleModal";
import DeleteMTGModal from "../Modal/DeleteMTGModal";
import moment from "moment";

const AppointmentCollapse = ({ eachAppointment, setIsMtgDeleteToast }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [isRescheduleModal, setIsRescheduleModal] = useState(false);
  const [isDeleteMTGModal, setIsDeleteMTGModal] = useState(false);

  const appointmentDow = moment(
    eachAppointment.appointmentDateTime.date
  ).format("dddd");
  const appointmentDate = moment(
    eachAppointment.appointmentDateTime.date
  ).format("MMM DD, YYYY");
  const appointmentStartTime = moment(
    eachAppointment.appointmentDateTime.time
  )._i;
  const appointmentEndTime = moment(
    `2023-4-15 ${eachAppointment.appointmentDateTime.time}`
  )
    .add(30, "m")
    .format("HH:mm");
  const createdDate = moment(eachAppointment.createdAt).format("MMM DD, YYYY");

  return (
    <div
      tabIndex={0}
      onClick={() => setIsCollapseOpen(!isCollapseOpen)}
      className="border border-info bg-base-100 rounded-box w-4/6 mx-auto"
    >
      <HashLink
        smooth
        to={`#${eachAppointment._id}`}
        className="text-xl font-medium flex items-center w-full py-3 mx-auto justify-evenly"
      >
        <div className="flex flex-col">
          <p className="w-full text-lg">{`${appointmentDow}, ${appointmentDate}`}</p>
          <p className="w-full text-lg">{`${appointmentStartTime} - ${appointmentEndTime}`}</p>
        </div>
        {isCollapseOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </HashLink>
      {isCollapseOpen && (
        <div id={eachAppointment._id} className="p-3 mx-auto">
          <div className="flex flex-col mx-3">
            <div className="flex items-center w-full">
              <p className="basis-[40%]">Guest name:</p>
              <span className="text-primary">{eachAppointment.name}</span>
            </div>
            <div className="flex items-center w-full">
              <p className="basis-[40%]">Guest email:</p>
              <span className="text-primary">{eachAppointment.email}</span>
            </div>
            <div className="flex items-center w-full">
              <p className="basis-[40%]">Comments:</p>
              <span className="text-primary">{eachAppointment.message}</span>
            </div>
            <div className="flex items-center w-full">
              <p className="basis-[40%]">Created at:</p>
              <span className="text-primary">{createdDate}</span>
            </div>
          </div>
          <div
            
            className="flex items-center justify-center my-2 gap-1"
          >
            <button
              className="cursor-pointer px-5 py-2 shadow rounded border-2 border-gray-300 block text-center text-black bg-white hover:bg-green-400 hover:text-white hover:border-green-400"
              onClick={() => setIsRescheduleModal(!isRescheduleModal)}
            >
              Reschedule
            </button>
            <button
              className="cursor-pointer px-5 py-2 shadow rounded border-2 border-gray-300 block text-center text-black bg-white hover:bg-green-400 hover:text-white hover:border-green-400"
              onClick={() => setIsDeleteMTGModal(!isDeleteMTGModal)}
            >
              Cancel MTG
            </button>
          </div>
        </div>
      )}
      {isRescheduleModal && (
        <RescheduleModal
          setIsRescheduleModal={setIsRescheduleModal}
          eachAppointment={eachAppointment}
        />
      )}
      {isDeleteMTGModal && (
        <DeleteMTGModal
          setIsDeleteMTGModal={setIsDeleteMTGModal}
          eachAppointment={eachAppointment}
          setIsMtgDeleteToast={setIsMtgDeleteToast}
        />
      )}
    </div>
  );
};

export default AppointmentCollapse;
