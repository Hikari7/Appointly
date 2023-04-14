import { useEffect, useState } from "react";

import moment from "moment";

import {
  createCalendar,
  getNextMonth,
  getPrevMonth,
} from "../../utils/calenderHelpers";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentMonth, setCurrentMonth] = useState(
    currentDate.format("YYYY-MM")
  );
  const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
  const [toggleCalendar, setToggleCalender] = useState(false);

  useEffect(() => {
    setCalendarDate(createCalendar(currentDate));
  }, [currentDate]);

  const today = moment();
  const year = currentDate.get("year");
  const month = currentDate.format("MMM");
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleChangeMonth = (direction) => {
    if (direction === "next") {
      setCurrentDate(moment(getNextMonth(currentDate)._d));
      setCurrentMonth(moment(getNextMonth(currentDate)._d).format("YYYY-MM"));
    } else {
      setCurrentDate(moment(getPrevMonth(currentDate)._d));
      setCurrentMonth(moment(getPrevMonth(currentDate)._d).format("YYYY-MM"));
    }
  };

  const handleClick = (date) => {
    setSelectedDate(date)
    setToggleCalender(false)
  }

  return (
    <div className="">
      <input
        type="text"
        className="cursor-pointer relative w-full pl-3 my-1 pr-10 py-2 leading-none shadow border border-gray-700 rounded-lg shadow-sm text-gray-700 "
        placeholder="Select date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        onClick={() => setToggleCalender(!toggleCalendar)}
      />
      {toggleCalendar && (
        <div className="w-[65%] md:w-1/2 p-2 pt-8 border border-gray-700 rounded-lg bg-white absolute top[0%] left-[26%] z-50">
          <div onClick={() => setToggleCalender(false)} className='flex justify-end absolute top-[1%] right-[2%]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex justify-between items-center mb-1">
            <svg
              onClick={() => handleChangeMonth("prev")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <div className="text-xl md:text-2xl text-bold">{`${year} ${month}`}</div>
            <svg
              onClick={() => handleChangeMonth("next")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="flex justify-around mb-3">
            {dow.map((item, index) => (
              <div key={index} className="text-sm md:text-base">
                {item}
              </div>
            ))}
          </div>
          {calendarData &&
            calendarData.map((week, index) => (
              <div key={index} className="flex h-6 md:text-xl">
                {week.map((day, index) => {
                  if (currentMonth !== day.month) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center text-gray-300">
                          {day.date}
                        </div>
                      </div>
                    );
                  } else if (
                    moment(`${day.month}-${day.date}`).isBefore(
                      today.format("YYYY-MM-D")
                    ) |
                    (currentMonth !== day.month)
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center text-gray-300">
                          {day.date}
                        </div>
                      </div>
                    );
                  } else if (
                    moment(`${day.month}-${day.date}`)._i ===
                    today.format("YYYY-MM-D")
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center font-bold text-green-400 rounded-full">
                          {day.date}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          handleClick(`${day.month}-${day.date}`)
                        }
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center">{day.date}</div>
                      </div>
                    );
                  }
                })}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
