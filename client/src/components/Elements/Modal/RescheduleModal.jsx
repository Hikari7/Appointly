import React, { useState, useRef } from "react";
import moment from "moment";
import DatePicker from "../../User/DatePicker";
import userAppointmentApi from "../../../api/userAppointmentApi";
import { useDispatch } from "react-redux";
import { updateAppointment } from "../../../redux/slicers/listAppointment";
import ToastError from "../Toast/ToastError";
import ToastSuccess from "../Toast/ToastSuccess";
import emailjs from "@emailjs/browser";

const RescheduleModal = ({ setIsRescheduleModal, eachAppointment }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [toggleTimeSelector, setToggleTimeSelector] = useState(false);
  const [isMtgRescheduleToast, setIsMtgRescheduleToast] = useState({
    success: false,
    error: false,
  });
  const dispatch = useDispatch();

  const formattedDate = moment(eachAppointment.appointmentDateTime.date).format(
    "MMM DD, YYYY"
  );
  const appointmentStartTime = moment(
    eachAppointment.appointmentDateTime.time
  )._i;
  const appointmentEndTime = moment(
    `2023-4-15 ${eachAppointment.appointmentDateTime.time}`
  )
    .add(30, "m")
    .format("HH:mm");

  //Create selectable time array
  const timeArr = [];
  let baseTime = moment("2023-03-20 00:00");
  while (baseTime.format("HH:mm") !== "23:00") {
    timeArr.push(baseTime.format("HH:mm"));
    baseTime.add(30, "m");
    if (baseTime.format("HH:mm") === "23:00") {
      timeArr.push("23:00");
      timeArr.push("23:30");
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setToggleTimeSelector(false);
  };

  const handleSubmit = async (e) => {
    try {
      const params = {
        date: selectedDate,
        time: selectedTime,
      };

      const res = await userAppointmentApi.updateMTG(
        eachAppointment._id,
        params
      );

      if (res.status === 200) {
        setIsRescheduleModal(false);
        dispatch(
          updateAppointment({
            meetingId: eachAppointment._id,
            dateTime: params,
          })
        );

        const newObj = { ...params };
        newObj.guestEmail = eachAppointment.email;
        newObj.guestName = eachAppointment.name;

        emailjs
          .send(
            import.meta.env.VITE_APP_SERVICE_ID_SECOND,
            import.meta.env.VITE_APP_RESCHEDULED_TEMPLATE_ID,
            newObj,
            import.meta.env.VITE_APP_PUBLIC_KEY_SECOND
          )
          .then(
            (result) => {
              console.log(result.text);
              return { status: "success" };
            },
            (error) => {
              console.log(error.text);
              return { status: "faile" };
            }
          );
        // setIsMtgRescheduleToast({ error: false, success: true });
        setIsMtgRescheduleToast((prev) => ({ ...prev, success: true }));
        // console.log("success", isMtgRescheduleToast.success);
        // console.log(isMtgRescheduleToast);
      }
    } catch (error) {
      setIsMtgRescheduleToast((prev) => ({ ...prev, error: true }));
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center py-10 h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-12 border-0 rounded-lg shadow-lg relative flex flex-col items-center justify-between w-4/5 md:w-[40%] h-[80%]  bg-white outline-none focus:outline-none">
        <div
          onClick={() => setIsRescheduleModal(false)}
          className="flex justify-end absolute top-[2%] right-[3%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 translate rounded-full hover:bg-gray-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="text-center text-3xl font-bold font-second mt-6">
          Reschedule Meeting?
        </div>
        <p className="text-center break-words">
          An email notification will be sent to your guest informing them of the
          rescheduling.
        </p>
        <div className="flex justify-evenly w-[80%]">
          <div>
            <p>Guest name</p>
            <span className="text-primary">{eachAppointment.name}</span>
          </div>

          <div>
            <p>Current date</p>
            <span className="text-primary">{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex items-center w-full justify-center">
            <label className="block font-second mr-5">Date</label>
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="flex items-center w-full relative justify-center">
            <label className="block font-second mr-5">Time</label>
            <input
              type="text"
              className="cursor-pointer pl-3 my-1 pr-10 py-2 leading-none border border-gray-700 rounded-lg shadow-sm"
              placeholder="Select time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              onClick={() => setToggleTimeSelector(!toggleTimeSelector)}
            />
            {toggleTimeSelector && (
              <div
                className={
                  "flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[300%] overflow-y-scroll absolute top-[56%] left-[18%] md:top-[60%] md:left-[33%] z-50"
                }
              >
                {timeArr &&
                  timeArr.map((eachTime, index) => (
                    <div
                      onClick={() => handleTimeSelect(eachTime)}
                      key={index}
                      className="p-1 hover:bg-gray-200 rounded-lg"
                    >
                      {eachTime}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={!(selectedDate && selectedTime)}
          className="btn btn-primary disabled:btn-disabled normal-case font-bold py-2 w-28 mt-3"
        >
          Reschedule
        </button>
      </div>
      {isMtgRescheduleToast.error && (
        <ToastError
          props={"Something went wrong... Please try again."}
          setFunction={setIsMtgRescheduleToast}
          method={"mtg"}
        />
      )}
      {isMtgRescheduleToast.success && (
        <ToastSuccess
          props={"Rescheduled successfully"}
          method={"mtg"}
          setFunction={setIsMtgRescheduleToast}
        />
      )}
    </div>
  );
};

export default RescheduleModal;
