import moment from 'moment';
import { useEffect, useState } from 'react';

import { createCalendar, getNextMonth, getPrevMonth } from "../../utils/calenderHelpers";

const BaseCalendar = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState(currentDate.format("YYYY-MM")) 
    const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
    const [selectedDate, setSlectedDate] = useState(new Date())

    
    useEffect(() => {
      setCalendarDate(createCalendar(currentDate))
    }, [currentDate])
  
    const today = moment()
    const year = currentDate.get('year')
    const month = currentDate.format('MMM')
    const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const setAvailabileDow = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    
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
              <div key={index} className="flex h-12">
                {week.map((day, index) => {
                  if(currentMonth !== day.month){              
                    return (
                        <div key={index} className='flex-1 flex justify-center items-center'>
                            <div onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="text-center text-gray-300">{day.date}</div>
                        </div>
                    )
                  }else if(moment(`${day.month}-${day.date}`)._i === today.format("YYYY-MM-DD")){
                    return (
                        <div key={index} className='flex-1 flex justify-center items-center'>
                            <div onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="text-center font-bold text-green-400 rounded-full">{day.date}</div>
                        </div>
                    )  
                  }else if(moment(`${day.month}-${day.date}`).format('d') === "6"){
                    return (
                        <div key={index} className='flex-1 flex justify-center items-center relative'>
                            <div className='w-7 h-7 bg-green-200 rounded-full absolute top-[23.5%] left-[23.5%]'></div>
                            <div onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="text-center z-50">{day.date}</div>
                        </div>
                    )  
                  }else{
                    return (
                        <div key={index} className='flex-1 flex justify-center items-center'>
                            <div onClick={() => setSlectedDate(`${day.month}-${day.date}`)} className="text-center">{day.date}</div>
                        </div>
                    )  
                  }
                })}
              </div>
            ))
          }
        </div>
      )
}

export default BaseCalendar

// https://reffect.co.jp/vue/javascript-vue-js-create-calendar
