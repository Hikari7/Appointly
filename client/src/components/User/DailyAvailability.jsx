import { useState, useEffect, createContext } from 'react'
import { HashLink } from "react-router-hash-link"
import { useSelector } from 'react-redux';

import moment from 'moment';

import { createCalendar, getNextMonth, getPrevMonth } from "../../utils/calenderHelpers";
import TimeAvailability from './TimeAvailability';
import { useParams } from 'react-router';

export const TargetTime = createContext()

const DailyAvailability = () => {
    const weeklyAvailability = useSelector((state) => state.availability.weekly)
    const dailyAvailability = useSelector((state) => state.availability.daily)
    const param = useParams()
    const [modifiedWeeklyAvailability, setModifiedWeeklyAvailability] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState(currentDate.format("YYYY-MM")) 
    const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
    const [selectedDate, setSlectedDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState("")
    const [availableDowArr, setAvailableDowArr] = useState("")
    const [currentAvailbleTime, setCurrentAvailbleTime] = useState([])
    const value = {currentAvailbleTime, setCurrentAvailbleTime}

    useEffect(() => {
      setCalendarDate(createCalendar(currentDate))
    }, [currentDate])

    useEffect(() => {
      // Add "dow" property on each object
      let dowNum = 0
      weeklyAvailability.map(e => {
        let dow = String(dowNum)
        dowNum += 1
        return {...e, dow}
      })

      // Set availableDowArr
      let tempArr = []
      weeklyAvailability.map(eachDate => {
        if(eachDate[Object.keys(eachDate)[0]]){
          tempArr.push(eachDate.dow)
        }
      })
      setAvailableDowArr(tempArr)
      setModifiedWeeklyAvailability(weeklyAvailability)
    }, [])

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

    const handleClickDate = (date, timeArray) => {
      setIsOpen(true)
      setSlectedDate(date)
      setCurrentAvailbleTime(timeArray)
      setSelectedItem(date)
    }

  return (
    <div className='flex flex-col m-10 md:flex-row md:justify-center'>
        <div className='md:w-[50%] p-5'>
          <div className="flex justify-between items-center mb-5">
            <svg onClick={() => handleChangeMonth("prev")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className='text-2xl md:text-3xl text-bold'>{`${year} ${month}`}</div>
            <svg onClick={() => handleChangeMonth("next")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className='flex justify-around mb-5 md:mb-10'>
            {dow.map((item, index) => <div key={index} className='text-sm md:text-base'>{item}</div>)}
          </div>
          {calendarData && 
            calendarData.map((week, index) => (
              <div key={index} className="flex h-8 md:h-12 md:text-xl">
                {week.map((day, weekIndex) => {
                  {/* Set color to gray for dates before current date. */}
                  if(moment(`${day.month}-${day.date}`).isBefore(today.format("YYYY-MM-D")) | currentMonth !== day.month){              
                    return (
                      <div key={weekIndex} className='flex-1 flex justify-center items-center'>
                        <div className="text-center text-gray-300">{day.date}</div>
                      </div>
                    )
                  {/* Set today's color. */}
                  }else if(moment(`${day.month}-${day.date}`)._i === today.format("YYYY-MM-D")){
                    return (
                      <div key={weekIndex} className='flex-1 flex justify-center items-center'>
                        <div className="text-center font-bold text-green-400 rounded-full">{day.date}</div>
                      </div>
                    )
                  {/* Condition for a date that has daily availability. */}
                  }else if(dailyAvailability.find(eachDateTimeObj => eachDateTimeObj.date === moment(`${day.month}-${day.date}`).format('YYYY-MM-D'))){
                    const targetDateTimeObj = dailyAvailability.find(eachDateTimeObj => eachDateTimeObj.date === moment(`${day.month}-${day.date}`).format('YYYY-MM-D'))
                    return (
                      selectedItem === `${day.month}-${day.date}`
                        ? (
                            <div onClick={() => handleClickDate(`${day.month}-${day.date}`, targetDateTimeObj.time)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                              <div className="text-center w-[1.5rem] h-[1.5rem] md:w-[1.8rem] md:h-[1.8rem] bg-green-200 rounded-full">{day.date}</div>
                            </div>
                          )
                        : (
                            <div onClick={() => handleClickDate(`${day.month}-${day.date}`, targetDateTimeObj.time)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                              <div className="text-center">{day.date}</div>
                            </div>
                          )  
                    )
                  {/* Condition for a date that has weekly availability. */}
                  }else if(availableDowArr.includes(Number(moment(`${day.month}-${day.date}`).format('d')))){
                    const timeArray = modifiedWeeklyAvailability.filter(e => e.dow === Number(moment(`${day.month}-${day.date}`).format('d')))
                    return (
                      selectedItem === `${day.month}-${day.date}`
                        ? (
                            <div onClick={() => handleClickDate(`${day.month}-${day.date}`, timeArray[0].time)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                              <div className="text-center w-[1.5rem] h-[1.5rem] md:w-[1.8rem] md:h-[1.8rem] bg-green-200 rounded-full">{day.date}</div>
                            </div>
                          )
                        : (
                            <div onClick={() => handleClickDate(`${day.month}-${day.date}`, timeArray[0].time)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                              <div className="text-center">{day.date}</div>
                            </div>
                          )  
                    )
                  {/* Condition for a date that does not have availability */}
                  {/* Set bg-color for selected date */}
                  }else{
                    return (
                      selectedItem === `${day.month}-${day.date}`
                        ? (
                            <div onClick={() => handleClickDate(`${day.month}-${day.date}`, [{start: "", end: ""}])} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                              <div className="text-center w-[1.5rem] h-[1.5rem] md:w-[1.8rem] md:h-[1.8rem] bg-green-200 rounded-full">{day.date}</div>
                            </div>
                          )
                        : (
                            <div onClick={() => handleClickDate(`${day.month}-${day.date}`, [{start: "", end: ""}])} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                              <div className="text-center">{day.date}</div>
                            </div>
                          )  
                    )}
                })}
              </div>
            ))
          }
          <hr className='mt-5 md:hidden'/>
        </div>
        {isOpen && 
          <TargetTime.Provider value={value}>
            <TimeAvailability timeArray={currentAvailbleTime} selectDate={selectedDate} /> 
          </TargetTime.Provider>
        }
      </div>
  )
}

export default DailyAvailability