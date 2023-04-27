import { useQuery } from 'react-query'

import userAppointmentApi from '../api/userAppointmentApi';

const useAvailabilityForGuest = (userId, weeklyUpdater, dailyUpdater, dowArrayUpdater) => {
  return useQuery({
    queryKey: ["availabilityForGuestCalendar"],
    queryFn: async () => {
      const { data } = await userAppointmentApi.getAvailability(userId)
      if (data.length > 0) {
        let dowNum = 0;
        const modifiedAvailabilityObj = data[0].weekly.map((e) => {
          let dow = String(dowNum);
          dowNum += 1;
          return { ...e, dow };
        });
        weeklyUpdater(modifiedAvailabilityObj);
  
        const tempAvailableDowArr = [];
        modifiedAvailabilityObj.map((e) => {
          if (Object.values(e).includes(true)) {
            tempAvailableDowArr.push(e.dow);
          }
        });
        dowArrayUpdater(tempAvailableDowArr);
      }

      if(data[0] && data[0].daily){
        dailyUpdater(data[0].daily);
      }
      return data
    }
  })
}

export default useAvailabilityForGuest