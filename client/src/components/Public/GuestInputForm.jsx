import React, { useState, useRef } from "react";
import appointmentApi from "../../api/guestAppointmentApi";
import { useSelector } from "react-redux";
import GuestInputModal from "../Elements/Modal/guestInputModal";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";

//CopyLinkから取得した名前を入れないかん

const GuestInputForm = () => {
  const { userId } = useParams();

  const appointment = useSelector((state) => state.appointment);
  const date = appointment.appointment.appointmentDateTime.date;
  const time = appointment.appointment.appointmentDateTime.time;

  const formRef = useRef();

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);

  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setNameErr("");

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

    if (error) return;

    setShowModal(true);

    const newObj = {
      name,
      email,
      message,
    };

    try {
      newObj.appointmentDateTime = appointment.appointmentDateTime;
      newObj.hostUser = appointment.hostUser;
      appointmentApi({
        newObj,
      });
      console.log(name);
    } catch (err) {
      console.log(err);
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_USER_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_GUEST_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
            name="guest_name"
            className="input input-bordered w-full max-w-xs input-primary "
          />

          {nameErr !== "" ? (
            <p className="text-xs text-red-600 pt-1">{nameErr}</p>
          ) : (
            ""
          )}
          <label className="label">
            <span className="label-text text-textBase">Email</span>
          </label>
          <input
            ref={emailInput}
            type="text"
            name="guest_email"
            className="input input-bordered w-full max-w-xs input-primary "
          />

          {emailErr !== "" ? (
            <p className="text-xs text-red-600 pt-1">{emailErr}</p>
          ) : (
            ""
          )}
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
          </div>

          <button
            type="submit"
            className="btn btn-primary normal-case font-bold w-2/8 ml-auto"
            htmlFor="my-modal-4"
          >
            Schedule Event
          </button>
          {/* this is how to make a recipent valuable */}
          {/* <input type="hidden" value={recipient_name} name={recipient_name}></input>
          {{ recipient_name }} */}
          {/* <input type="hidden" value={date} name={date}></input>
          {{ date }} */}
          <input type="hidden" value={time} name={time}></input>
          <input type="hidden" value={date} name={date}></input>
        </form>
        {showModal ? <GuestInputModal showModal={true} /> : null}
      </div>
    </>
  );
};

export default GuestInputForm;
