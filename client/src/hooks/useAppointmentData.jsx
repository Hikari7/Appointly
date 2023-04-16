import userAppointmentApi from "../api/userAppointmentApi";
import { setListAppointment } from "../redux/slicers/listAppointment";
import { useDispatch, useSelector } from "react-redux";

const useAppoinmentData = async () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  try {
    const res = await userAppointmentApi.getAll(user.userId);
    if (res.data.length > 0) {
      const today = new Date();
      const filteredAppointment = res.data.filter(function (appointmentDate) {
        const filteredDate = new Date(appointmentDate.appointmentDateTime.date);
        if (today < filteredDate || today == filteredDate) {
          return filteredDate;
        } else {
          return;
        }
      });
      dispatch(setListAppointment(filteredAppointment));
    } else {
      dispatch(setListAppointment([]));
    }
  } catch (error) {
    console.log(error);
  }
};

export default useAppoinmentData;
