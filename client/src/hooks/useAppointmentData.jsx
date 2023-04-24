import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import userAppointmentApi from "../api/userAppointmentApi";
import { setListAppointment } from "../redux/slicers/listAppointment";

const useAppoinmentData = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userAppointmentApi.getAll(user.userId);
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
          filteredAppointment.sort((a, b) => {
            return moment(a.appointmentDateTime.date).diff(moment(b.appointmentDateTime.date))
          }) 
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
