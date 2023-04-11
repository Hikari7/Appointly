import { useState } from 'react'

const RescheduleModal = () => {
  const [selectedDate, setSelectedDate] = useState("")
  const [isDatePicker, setIsDatePicker] = useState(false)

  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-4/5 md:w-1/3 bg-white outline-none focus:outline-none">
        <div className='text-center font-bold'>Reschedule</div>
        <div className=''>
          <label className='text-gray-700'>Date</label>
          <input 
          className=''
            type='text'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {/* {isDatePicker && } */}
        </div>
      </div>
    </div>
  )
}

export default RescheduleModal