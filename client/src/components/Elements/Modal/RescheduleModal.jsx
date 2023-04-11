import { useState } from 'react'

import moment from 'moment';

import DatePicker from '../../User/DatePicker'

const RescheduleModal = ({setIsRescheduleModal}) => {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [toggleTimeSelector, setToggleTimeSelector] = useState(false)


  //Create selectable time array
  const timeArr = []
  let baseTime = moment('2023-03-20 00:00')
  while(baseTime.format('HH:mm') !== "23:00"){
      timeArr.push(baseTime.format('HH:mm'))
      baseTime.add(30, 'm')
      if(baseTime.format('HH:mm') === "23:00"){
        timeArr.push("23:00")
        timeArr.push("23:30")
      }
  }

  return (
    <div className="flex justify-center py-10 h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-4/5 md:w-1/3 bg-white outline-none focus:outline-none">
        <div onClick={() => setIsRescheduleModal(false)} className='flex justify-end absolute top-[5%] right-[3%]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 translate rounded-full hover:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className='text-center text-xl font-bold mb-8'>Reschedule the Meeting</div>
        <div className='flex flex-col'>
          <div className='flex justify-center items-center w-full'>
            <label className='text-gray-700 ml-1 block w-[20%]'>Date:</label>
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className='flex justify-center items-center w-full'>
            <label className='text-gray-700 ml-1 block w-[20%]'>Time:</label>
            <input
              type="text"
              className="cursor-pointer w-full pl-3 my-1 pr-10 py-2 leading-none shadow border border-gray-700 rounded-lg shadow-sm text-gray-700"
              placeholder="Select time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              onClick={() => setToggleTimeSelector(!toggleTimeSelector)}
            />
            {toggleTimeSelector && 
              <div className={"flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[50%] overflow-y-scroll absolute top-[38%] left-[19%] z-50"}>
              {timeArr && timeArr.map((eachTime, index) => (
                  <div onClick={() => setSelectedTime(eachTime)} key={index} className='p-1 hover:bg-gray-200 rounded-lg'>
                      {eachTime}
                  </div>
              ))}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RescheduleModal