import { useMutation } from "react-query";
import { useSelector } from "react-redux";

import moment from "moment";

import { sendEmail } from "../utils/sendEmail";
import guestAppointmentApi from "../api/guestAppointmentApi";

const handleCreateAppointment = async ({ newObj }) => {
  const res = await guestAppointmentApi({ newObj });
  return res.data;
};

const usePostAppointment = (
  hostEmailUpdater,
  hostNameUpdater,
  modalUpdater,
  toastUpdater
) => {
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

  

  return useMutation(handleCreateAppointment, {
    onSuccess: (data) => {
      hostEmailUpdater(data.email);
      hostNameUpdater(data.username);
      modalUpdater(true);

      const params = {
        name: data.guestName,
        email: data.guestEmail,
        message: data.message,
        hostEmail: data.email,
        hostName: data.username,
        time: `${appointmentStartTime} - ${appointmentEndTime}`,
        date: appointmentDate,
      };

      sendEmail(params, "user")
      sendEmail(params, "guest")
    },
    onError: () => {
      toastUpdater(true);
    },
  });
};

export default usePostAppointment;
