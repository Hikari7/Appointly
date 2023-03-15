import moment from 'moment';


const getStartDate = (currentDate) => {
    const today = moment(currentDate);
    today.startOf("month");
    const dow = today.day();
    return today.subtract(dow, "days");
}

const getEndDate = (currentDate) => {
    const today = moment(currentDate);
    today.endOf("month");
    const dow = today.day();
    return today.add(6 - dow, "days");
}

const countWeekDay = (currentDate) => {
    const startDate = getStartDate(currentDate);
    const endDate = getEndDate(currentDate);
    const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
    return weekNumber
}

export const createCalendar = (currentDate) => {
    let startDate = getStartDate(currentDate);
    const weekNumber = countWeekDay(currentDate)

    let calendars = [];
    for (let week = 0; week < weekNumber; week++) {
      let weekRow = [];
      for (let day = 0; day < 7; day++) {
        weekRow.push({
          date: startDate.get("date"),
          month: startDate.format("YYYY-MM"),
        });
        startDate.add(1, "days");
      }
      calendars.push(weekRow);
    }
    return calendars;
}

export const getNextMonth = (currentDate) => {
  return moment(currentDate).add(1, "month"); 
}

export const getPrevMonth = (currentDate) => {
  return moment(currentDate).subtract(1, "month");
}

export const handleChangeMonth = (direction) => {
  if(direction === "next"){
    setCurrentDate(moment(getNextMonth(currentDate)._d))
  }else{
    setCurrentDate(moment(getPrevMonth(currentDate)._d))
  }
}