import { useDispatch, useSelector } from 'react-redux';

import userAppointmentApi from '../api/userAppointmentApi';
import { setAvailability } from '../redux/slicers/availabilitySlice';


const useAvailabilityData = async () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  try {
    const res = await userAppointmentApi.getAvailability(user.userId);
    if (res.data.length > 0) {
      const availabilityObj = {};
      availabilityObj.weekly = res.data[0].weekly;
      availabilityObj.daily = res.data[0].daily;
      dispatch(setAvailability(availabilityObj));
    } else {
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
  } catch (error) {
    console.log(error);
  }
}

export default useAvailabilityData