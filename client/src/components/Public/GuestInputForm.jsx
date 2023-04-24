import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import GuestInputModal from "../Elements/Modal/guestInputModal";
import usePostAppointment from "../../hooks/usePostAppointment";
import ToastError from "../Elements/Toast/ToastError";

const GuestInputForm = () => {
  const appointment = useSelector((state) => state.appointment.appointment);
  const date = appointment.appointmentDateTime.date;
  const time = appointment.appointmentDateTime.time;
  const uidFromParams = useParams();

  const formRef = useRef(null);

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);

  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [messageErr, setMessageErr] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [hostEmail, setHostEmail] = useState("");
  const [hostName, setHostName] = useState("");

  const { mutate, isLoading } = usePostAppointment(setHostEmail, setHostName, setShowModal, setShowErrorToast)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setNameErr("");
    setMessageErr("");

    const name = nameInput.current.value;
    const email = emailInput.current.value;
    const message = messageInput.current.value;

    let error = false;
    if (name === "") {
      error = true;
      setNameErr("Please enter your name");
    }

    if (email === "" || !email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      error = true;
      setEmailErr("Please enter an invalid email");
    }

    if (message === "") {
      error = true;
      setMessageErr("Please fill message");
    }

    if (error) return;

    const newObj = {
      name,
      email,
      message,
      appointmentDateTime: appointment.appointmentDateTime,
      hostUser: uidFromParams.uid
    };

    // Call createAppointment api
    mutate({newObj})

  };

  
  return (
    <>
      <div className="form-control w-full md:w-10/12 md:justify-center md:mx-auto mt-6">
        <form onSubmit={handleSubmit} ref={formRef}>
          <h1 className="text-3xl font-second my-3">Enter Details</h1>
          <label className="label">
            <span className="label-text text-textBase">Name</span>
          </label>
          <input
            ref={nameInput}
            type="text"
            name="name"
            className="input input-bordered w-full max-w-xs input-primary "
          />

          {nameErr !== "" && <p className="text-xs text-red-600 pt-1">{nameErr}</p>}
          <label className="label">
            <span className="label-text text-textBase">Email</span>
          </label>
          <input
            ref={emailInput}
            type="text"
            name="email"
            className="input input-bordered w-full max-w-xs input-primary "
          />

          {emailErr !== "" && <p className="text-xs text-red-600 pt-1">{emailErr}</p>}

          <div className="form-control mt-3 my-5">
            <label className="label">
              <span className="label-text normal-case text-textBase">
                Please share anything that will help prepare for our meeting.
              </span>
            </label>
            <textarea
              ref={messageInput}
              type="text"
              name="message"
              className="textarea textarea-bordered h-24 textarea-primary"
            ></textarea>
            {messageErr !== "" && <p className="text-xs text-red-600 pt-1">{messageErr}</p>}
          </div>

          <button
            type="submit"
            className={`btn btn-primary normal-case font-bold w-2/8 ml-auto ${isLoading && "loading"}`}
            htmlFor="my-modal-4"
          >
            Schedule Event
          </button>

          <input type="hidden" value={hostName} name={hostName}></input>
          <input type="hidden" value={hostEmail} name={hostEmail}></input>
          <input type="hidden" value={time} name={time}></input>
          <input type="hidden" value={date} name={date}></input>
        </form>
        {showModal && 
          <GuestInputModal
            showModal={true}
            hostName={hostName}
            hostEmail={hostEmail}
          />
        }
        {showErrorToast && 
          <ToastError 
            props={"Something went wrong... Please try again."}
            setFunction={setShowErrorToast}
          />
        }
      </div>
    </>
  );
};

export default GuestInputForm;
