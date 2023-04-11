import React from 'react'

const RescheduleModal = () => {
  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-4/5 md:w-1/3 bg-white outline-none focus:outline-none">
        <div className='text-center font-bold'>Reschedule</div>
        <div className=''>
          <input type='text'/>
        </div>
      </div>
    </div>
  )
}

export default RescheduleModal