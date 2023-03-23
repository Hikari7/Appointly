import React, { useState, useRef } from "react";
import appointmentApi from "../../api/guestAppointmentApi";
import { useSelector } from "react-redux";
import GuestInputModal from "../Elements/Modal/guestInputModal";
import emailjs from "@emailjs/browser";

const GuestInputForm = () => {
  const appointment = useSelector((state) => state.appointment);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);

  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ----------------------------------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // console.log(emailValue);
  //----------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setNameErr("");

    const name = nameInput.current.value;
    const email = emailInput.current.value;
    const message = messageInput.current.value;
    // setName(nameInput.current.value);
    // setEmail(emailInput.current.value);
    // setMessage(messageInput.current.value);

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

    newObj.appointmentDateTime = appointment.appointmentDateTime;
    newObj.hostUser = appointment.hostUser;

    try {
      const res = await appointmentApi({
        newObj,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // emailjs
    //   .send(
    //     import.meta.env.VITE_APP_SERVICE_ID,
    //     import.meta.env.VITE_APP_TEMPLATE_ID,
    //     templateParams
    //   )
    //   .then(
    //     function (response) {
    //       console.log("SUCCESS!", response.status, response.text);
    //     },
    //     function (error) {
    //       console.log("FAILED...", error);
    //     }
    //   );

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_TEMPLATE_ID,
        form.current,
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

    //✅消えない
    setName("");
    setEmail("");
    setMessage("");
  };
  // console.log(import.meta.env.VITE_APP_PUBLIC_KEY);

  return (
    <>
      <div className="form-control w-full md:w-10/12 md:justify-center md:mx-auto mt-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-second my-3">Enter Details</h1>
          <label className="label">
            <span className="label-text text-textBase">Name</span>
          </label>
          <input
            ref={nameInput}
            type="text"
            name="user_name"
            // placeholder={nameValue}
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
            // placeholder={emailValue}
            name="user_email"
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
            >
              {/* {messageValue} */}
            </textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary normal-case font-bold w-2/8 ml-auto"
            htmlFor="my-modal-4"
          >
            Schedule Event
          </button>
        </form>
        {showModal ? <GuestInputModal showModal={true} /> : null}
      </div>
    </>
  );
};

export default GuestInputForm;
