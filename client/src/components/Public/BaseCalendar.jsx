import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import moment from "moment";

import {
  createCalendar,
  getNextMonth,
  getPrevMonth,
} from "../../utils/calenderHelpers";
import TimeSelector from "../Elements/Selector/TimeSelector";
import { useParams } from "react-router";
import useAvailabilityForGuest from "../../hooks/useAvailabilityForGuest";

const BaseCalendar = () => {
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const [dailyAvailability, setDailyAvailability] = useState([]);
  const [availableDowArr, setAvailableDowArr] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentMonth, setCurrentMonth] = useState(
    currentDate.format("YYYY-MM")
  );
  const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
  const [selectedDate, setSlectedDate] = useState(new Date());
  const [displayTime, setDisplayTime] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const { isFetching } = useAvailabilityForGuest(
    params.uid,
    setWeeklyAvailability,
    setDailyAvailability,
    setAvailableDowArr
  );

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

  const handleClickDate = (date, timeArray) => {
    setIsOpen(true);
    setSlectedDate(date);
    setDisplayTime(timeArray);
  };

  if (isFetching) {
    return (
      <div className="flex pl-[7rem] md:pl-[16rem] lg:pl-[23rem] py-[5rem]">
        <svg
          aria-hidden="true"
          className="w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#F7EDD6]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-center md:w-full">
      <div className="md:w-1/2 p-5">
        <div className="flex justify-between items-center mb-5">
          <svg
            onClick={() => handleChangeMonth("prev")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

          <div className="text-2xl md:text-3xl text-bold">{`${year} ${month}`}</div>
          <span>
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
          </span>
        </div>
        <div className="flex justify-around mb-10">
          {dow.map((item, index) => (
            <div key={index} className="text-sm md:text-base">
              {item}
            </div>
          ))}
        </div>
        {calendarData &&
          calendarData.map((week, index) => (
            <div key={index} className="flex h-12 md:text-xl">
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
                } else if (
                  dailyAvailability.find(
                    (eachObj) =>
                      eachObj.date ===
                      moment(`${day.month}-${day.date}`).format("YYYY-MM-D")
                  )
                ) {
                  // Get target dailyAvailability obj
                  const targetObj = dailyAvailability.find(
                    (eachObj) =>
                      eachObj.date ===
                      moment(`${day.month}-${day.date}`).format("YYYY-MM-D")
                  );
                  if (
                    moment(`${day.month}-${day.date}`).isBefore(
                      today.format("YYYY-MM-D")
                    )
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center">{day.date}</div>
                      </div>
                    );
                  } else if (
                    moment(`${day.month}-${day.date}`).diff(today, "day") > 30
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center">{day.date}</div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center relative group"
                      >
                        <HashLink
                          smooth
                          to="#timeSelect"
                          onClick={() =>
                            handleClickDate(
                              `${day.month}-${day.date}`,
                              targetObj.time
                            )
                          }
                          className="flex justify-center items-center w-[1.7rem] h-[1.7rem] md:w-8 md:h-8 bg-green-200 rounded-full group-hover:bg-green-400"
                        >
                          <div className="text-center z-50">{day.date}</div>
                        </HashLink>
                      </div>
                    );
                  }
                } else if (
                  availableDowArr.includes(
                    moment(`${day.month}-${day.date}`).format("d")
                  )
                ) {
                  // Get target available time
                  const timeArray = weeklyAvailability.filter(
                    (e) =>
                      e.dow ===
                      String(moment(`${day.month}-${day.date}`).format("d"))
                  );
                  if (
                    moment(`${day.month}-${day.date}`).isBefore(
                      today.format("YYYY-MM-D")
                    )
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center">{day.date}</div>
                      </div>
                    );
                  } else if (
                    moment(`${day.month}-${day.date}`).diff(today, "day") > 30
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center"
                      >
                        <div className="text-center">{day.date}</div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex justify-center items-center relative group"
                      >
                        <HashLink
                          smooth
                          to="#timeSelect"
                          onClick={() =>
                            handleClickDate(
                              `${day.month}-${day.date}`,
                              timeArray[0].time
                            )
                          }
                          className="flex justify-center items-center w-[1.7rem] h-[1.7rem] md:w-8 md:h-8 bg-green-200 rounded-full group-hover:bg-green-400"
                        >
                          <div className="text-center z-50">{day.date}</div>
                        </HashLink>
                      </div>
                    );
                  }
                } else {
                  return (
                    <div
                      key={index}
                      className="flex-1 flex justify-center items-center"
                    >
                      <div className="text-center">{day.date}</div>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        <hr className="mt-5 md:hidden" />
      </div>
      {isOpen && (
        <TimeSelector timeArray={displayTime} selectDate={selectedDate} />
      )}
    </div>
  );
};

export default BaseCalendar;
