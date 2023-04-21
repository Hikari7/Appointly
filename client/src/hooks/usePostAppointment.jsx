import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'

import { sendEmail } from '../utils/sendEmail'
import guestAppointmentApi from '../api/guestAppointmentApi'

const handleCreateAppointment = async ({newObj}) => {
  const res = await guestAppointmentApi({newObj})
  return res.data
}

const usePostAppointment = (hostEmailUpdater, hostNameUpdater) => {
  const appointment = useSelector((state) => state.appointment.appointment);
  const date = appointment.appointmentDateTime.date;
  const time = appointment.appointmentDateTime.time;

  return useMutation(handleCreateAppointment, {
    onSuccess: data => {
      hostEmailUpdater(data.email);
      hostNameUpdater(data.username);

      const params = {
        ...newObj,
        hostEmail: email,
        hostName: username,
        time,
        date,
      };

      sendEmail(params, "user")
      sendEmail(params, "guest")
    }
  })
}

export default usePostAppointment