import React from 'react'

const DeleteMTGModal = ({setIsDeleteMTGModal, eachAppointment}) => {
  return (
    <div className="flex justify-center py-10 h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-4/5 md:w-1/3 bg-white outline-none focus:outline-none">
        <div onClick={() => setIsDeleteMTGModal(false)} className='flex justify-end absolute top-[2%] right-[3%]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 translate rounded-full hover:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className='text-center text-xl font-bold my-6'>Delete meeting?</div>
        <div className='flex flex-col items-center mb-5'>
          <div className=''>Guest name: {eachAppointment.name}</div>
          <div className=''>Guest email: {eachAppointment.email}</div>
          <div className=''>current schedule: {eachAppointment.appointmentDateTime.date}, {eachAppointment.appointmentDateTime.time}</div>
        </div>
        <div className='text-center text-xl font-bold my-6'>Are you sure delete this meeting?</div>

        <button
          onClick={(e) => handleSubmit(e)}
          // disabled={}
          className="bg-red-400 font-bold text-white rounded-lg w-[60%] md:w-[50%] py-2 my-5 mx-auto disabled:opacity-50 hover:bg-red-600"
        >
          Delete Reschedule
        </button>
      </div>
    </div>
  )
}

export default DeleteMTGModal