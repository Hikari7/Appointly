import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import userAppointmentApi from "../../../api/userAppointmentApi";
import { deleteAppointment } from "../../../redux/slicers/listAppointment";
import ToastError from "../Toast/ToastError";
import emailjs from "@emailjs/browser";

const DeleteMTGModal = ({ setIsDeleteMTGModal, eachAppointment }) => {
  const appointmentList = useSelector(
    (state) => state.listAppointment.listAppointment
  );
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isMtgDeleteToast, setIsMtgDeleteToast] = useState({
    success: false,
    error: false,
  });

  const handleSubmit = async () => {
    try {
      const res = await userAppointmentApi.deleteMTG(eachAppointment._id);
      if (res.status === 200) {
        setIsMtgDeleteToast((prev) => ({ ...prev, success: true }));
        setIsDeleteMTGModal(false);
        const filteredArray = appointmentList.filter(
          (e) => e._id !== eachAppointment._id
        );

        const newObj = {};
        newObj.date = res.data.appointmentDateTime.date;
        newObj.time = res.data.appointmentDateTime.time;
        newObj.guestEmail = res.data.email;
        newObj.guestName = res.data.name;

        emailjs
          .send(
            import.meta.env.VITE_APP_SERVICE_ID_SECOND,
            import.meta.env.VITE_APP_CANCEL_TEMPLATE_ID,
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

        dispatch(deleteAppointment({ filteredArray }));
      }
    } catch (error) {
      setIsMtgDeleteToast((prev) => ({ ...prev, error: true }));
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center py-10 h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-12 border-0 rounded-lg shadow-lg relative flex flex-col items-center justify-between w-4/5 md:w-[40%] h-[80%] md-[70%] bg-white outline-none focus:outline-none">
        <div
          onClick={() => setIsDeleteMTGModal(false)}
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
          Cancel meeting?
        </div>
        <p className="text-center break-words w-[80%]">
          An email notification will be sent to your guest informing them of the
          cancellation.
        </p>
        <div className="w-full">
          <p>Guest name</p>
          <span className="text-primary">{eachAppointment.name}</span>
        </div>

        <div className="w-full">
          <p>Guest email</p>
          <span className="text-primary">{eachAppointment.email}</span>
        </div>
        <div className="w-full">
          <p>Current schedule</p>
          <span className="text-primary">
            {eachAppointment.appointmentDateTime.date}
          </span>
          <span className="text-primary">
            {eachAppointment.appointmentDateTime.time}
          </span>
        </div>

        <label className="flex items-center justify-center gap-3 font-bold w-full">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          confirm cancel
        </label>
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={!isChecked}
          className="btn btn-error disabled:btn-disabled normal-case font-bold py-2 w-28 mt-3"
        >
          Cancel meeting
        </button>
      </div>
      {isMtgDeleteToast.error && (
        <ToastError
          props={"Something went wrong... Please try again."}
          setFunction={setIsMtgDeleteToast}
          method={"mtg"}
        />
      )}
    </div>
  );
};

export default DeleteMTGModal;
