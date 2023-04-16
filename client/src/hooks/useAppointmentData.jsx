import userAppointmentApi from "../api/userAppointmentApi";
import { setListAppointment } from "../redux/slicers/listAppointment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useAppoinmentData = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userAppointmentApi.getAll(user.userId);
        console.log(res);
        if (res.data.length > 0) {
          const today = new Date();
          const filteredAppointment = res.data.filter(function (
            appointmentDate
          ) {
            const filteredDate = new Date(
              appointmentDate.appointmentDateTime.date
            );
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
    fetchData();
  }, []);
};

export default useAppoinmentData;
