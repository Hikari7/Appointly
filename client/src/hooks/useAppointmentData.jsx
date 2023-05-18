import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import moment from "moment";
import userAppointmentApi from "../api/userAppointmentApi";
import { setListAppointment } from "../redux/slicers/listAppointment";

const useAppoinmentData = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { isFetching, isError } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await userAppointmentApi.getAll(user.userId);

      if (data.length > 0) {
        const today = new Date();
        const filteredAppointment = data.filter(function (appointmentDate) {
          const filteredDate = new Date(
            appointmentDate.appointmentDateTime.date
          );
          if (today < filteredDate) {
            return filteredDate;
          } else {
            return;
          }
        });
        filteredAppointment.sort((a, b) => {
          return moment(a.appointmentDateTime.date).diff(
            moment(b.appointmentDateTime.date)
          );
        });
        dispatch(setListAppointment(filteredAppointment));
      }

      if (data.length === 0) {
        dispatch(setListAppointment([]));
      }

      if (isError) {
        dispatch(setListAppointment([]));
      }
    },
  });
  return {
    isFetching,
    isError,
  };
};

export default useAppoinmentData;
