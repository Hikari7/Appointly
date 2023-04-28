import { useState, useContext } from "react";
import { HashLink } from "react-router-hash-link";
import moment from "moment";
import RescheduleModal from "../Modal/RescheduleModal";
import DeleteMTGModal from "../Modal/DeleteMTGModal";
import { appointmentToast } from "../../../pages/User/MyPage";

const AppointmentCollapse = ({ eachAppointment }) => {
  const { currentAvailbleTime, setCurrentAvailbleTime } =
    useContext(appointmentToast);

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
      className="border border-info bg-base-100 rounded-box w-[80%] md:w-4/6 mx-auto"
    >
      <HashLink
        smooth
        to={`#${eachAppointment._id}`}
        className="text-xl font-medium flex items-center w-full py-3 mx-auto justify-evenly font-second"
      >
        <div className="flex flex-col w-[70%]">
          <p className="w-full text-lg break-all">{`${appointmentDow}, ${appointmentDate}`}</p>
          <p className="w-full text-lg break-all">{`${appointmentStartTime} - ${appointmentEndTime}`}</p>
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
        <div id={eachAppointment._id} className="px-10 mx-auto w-full md:w-4/5">
          <div className="md:flex md:justify-between w-full">
            <div className="items-center w-full">
              <p className="basis-[50%]">Guest name</p>
              <span className="text-primary break-all ">
                {eachAppointment.name}
              </span>
            </div>
            <div className="items-center w-full mt-3 md:mt-0">
              <p className="basis-[50%]">Guest email</p>
              <span className="text-primary break-all ">
                {eachAppointment.email}
              </span>
            </div>
          </div>
          <div className="items-center w-full mt-3">
            <p className="basis-[50%]">Comments</p>
            <span className="text-primary break-all ">
              {eachAppointment.message}
            </span>
          </div>
          <div className="items-center w-full mt-3">
            <p className="basis-[50%]">Created at</p>
            <span className="text-primary">{createdDate}</span>
          </div>

          <div className="flex items-center justify-center my-6 gap-6">
            <button
              className="cursor-pointer px-5 py-2 shadow rounded block text-center  hover:bg-green-400 hover:text-white  bg-white text-neutral transition duration-200 w-32"
              onClick={() => setIsRescheduleModal(!isRescheduleModal)}
            >
              Reschedule
            </button>
            <button
              className="cursor-pointer px-5 py-2 shadow rounded block text-center  hover:bg-green-400 hover:text-white  bg-white text-neutral transition duration-200 w-32"
              onClick={() => setIsDeleteMTGModal(!isDeleteMTGModal)}
            >
              Cancel
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
        />
      )}
    </div>
  );
};

export default AppointmentCollapse;
