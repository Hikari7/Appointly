import { useMutation } from "react-query";
import { useSelector } from "react-redux";

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
  const date = appointment.appointmentDateTime.date;
  const time = appointment.appointmentDateTime.time;

  

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
        time,
        date,
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
