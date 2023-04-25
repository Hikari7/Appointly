import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

import userAppointmentApi from "../api/userAppointmentApi";
import { setAvailability } from "../redux/slicers/availabilitySlice";

const useAvailabilityData = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { isFetching, isError } = useQuery({
    queryKey: ["availability"],
    queryFn: async () => {
      const { data } = await userAppointmentApi.getAvailability(user.userId);
      if(data.length > 0){
        const availabilityObj = {};
          availabilityObj.weekly = data[0].weekly;
          availabilityObj.daily = data[0].daily;
          dispatch(setAvailability(availabilityObj));
        }
      }
  });

  if(isError){
    const availabilityObj = {};
    availabilityObj.weekly = [
      { Sun: false, time: [{ start: "", end: "" }], dow: 0 },
      { Mon: false, time: [{ start: "", end: "" }], dow: 1 },
      { Tue: false, time: [{ start: "", end: "" }], dow: 2 },
      { Wed: false, time: [{ start: "", end: "" }], dow: 3 },
      { Thu: false, time: [{ start: "", end: "" }], dow: 4 },
      { Fri: false, time: [{ start: "", end: "" }], dow: 5 },
      { Sat: false, time: [{ start: "", end: "" }], dow: 6 },
    ];
    availabilityObj.daily = [{ date: "", time: [{ start: "", end: "" }] }];
    dispatch(setAvailability(availabilityObj));
  }

  return ({isFetching, isError})
};

export default useAvailabilityData;
