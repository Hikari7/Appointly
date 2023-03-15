import moment from 'moment';
import { useEffect, useState } from 'react';

import { createCalendar, getNextMonth, getPrevMonth } from "../../utils/calenderHelpers";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentMonth, setCurrentMonth] = useState(currentDate.format("YYYY-MM")) 
  const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
  const [selectedDate, setSlectedDate] = useState(currentDate)

  useEffect(() => {
    setCalendarDate(createCalendar(currentDate))
  }, [currentDate])

  const today = moment()
  const year = currentDate.get('year')
  const month = currentDate.format('MMM')
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handleChangeMonth = (direction) => {
    if(direction === "next"){
      setCurrentDate(moment(getNextMonth(currentDate)._d))
      setCurrentMonth(moment(getNextMonth(currentDate)._d).format("YYYY-MM"))
    }else{
      setCurrentDate(moment(getPrevMonth(currentDate)._d))
      setCurrentMonth(moment(getPrevMonth(currentDate)._d).format("YYYY-MM"))
    }
  }

  return (
    <div className='md:w-1/3'>
      <div className="flex justify-between items-center mb-5">
        <svg onClick={() => handleChangeMonth("prev")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <div className='text-2xl text-bold'>{`${year} ${month}`}</div>
        <svg onClick={() => handleChangeMonth("next")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <div className='flex justify-around mb-10'>
        {dow.map((item, index) => <div key={index} className='text-sm'>{item}</div>)}
      </div>
      {calendarData && 
        calendarData.map((week, index) => (
          <div key={index} className="flex my-5">
            {week.map((day, index) => {
              if(currentMonth !== day.month){                
                return <div key={index} onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="flex-1 min-h-10 text-center text-gray-300">{day.date}</div>
              }else if(moment(`${day.month}-${day.date}`) === today){  
                return <div key={index} onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="flex-1 min-h-10 text-center bg-green-300 rounded-full">{day.date}</div>
              }else{
                return <div key={index} onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="flex-1 min-h-10 text-center">{day.date}</div>
              }
            })}
          </div>
        ))
      }
    </div>
  )
};

export default Calendar;





