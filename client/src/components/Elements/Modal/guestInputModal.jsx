import { useSelector } from "react-redux";

import moment from "moment";

import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import comfirmed from "../../../assets/confirmed.svg";

const guestInputModal = ({ hostName, hostEmail }) => {
  const appointment = useSelector((state) => state.appointment.appointment);

  const appointmentDow = moment(
    appointment.appointmentDateTime.date
  ).format("dddd");
  const appointmentDate = `${appointmentDow}, ${moment(
    appointment.appointmentDateTime.date
  ).format("MMM DD, YYYY")}`;
  const appointmentStartTime = moment(
    appointment.appointmentDateTime.time
  )._i;
  const appointmentEndTime = moment(
    `${appointmentDate} ${appointment.appointmentDateTime.time}`
  )
    .add(30, "m")
    .format("HH:mm");

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:w-2/4 w-3/4 justify-center">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between pt-5"></div>
            <div className="relative px-6 pb-5 flex-auto">
              <div className="block justify-center font-second text-center">
                <h2 className="text-4xl font-bold justify-center my-4 md:text-5xl">
                  Confirmed!
                </h2>
                <div className="font-bold my-2 text-sm md:text-xl">
                  You are scheduled with{" "}
                  <span className="text-primary">{hostName}</span>
                </div>
                <div className="text-sm">
                  The host will be in touch soon, <br></br>but feel free to
                  reach out if you have any questions.
                  <br></br>
                  <h2>
                    you can reach out:
                    <span className="text-primary"> {hostEmail}</span>
                  </h2>
                </div>
              </div>
              <img
                src={comfirmed}
                className="w-1/2 h-1/2 object-cover my-7 mx-auto md:max-h-56 md:max-w-fit"
              />
              <div className="md:flex md:justify-evenly md:w-11/12 mx-auto ">
                <div className="flex items-center my-3  md:text-xl">
                  <div>
                    <h2 className="mx-1 my-2">
                      <FaRegCalendarAlt />
                    </h2>
                  </div>
                  <div className="mx-1 my-2">
                    <h2>{appointmentDate}</h2>
                    <h2>{`${appointmentStartTime} - ${appointmentEndTime}`}</h2>
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
  );
};

export default guestInputModal;
