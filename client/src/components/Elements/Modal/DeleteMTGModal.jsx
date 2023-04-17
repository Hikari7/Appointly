import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import userAppointmentApi from '../../../api/userAppointmentApi';
import { deleteAppointment } from "../../../redux/slicers/listAppointment"
import ToastError from '../Toast/ToastError';

const DeleteMTGModal = ({setIsDeleteMTGModal, eachAppointment}) => {
  const appointmentList  = useSelector( (state) => state.listAppointment.listAppointment );
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const [isMtgDeleteToast, setIsMtgDeleteToast] = useState({success: false, error: false})

  const formattedDate = moment(eachAppointment.appointmentDateTime.date).format("MMM DD, YYYY")
  const appointmentStartTime = moment(eachAppointment.appointmentDateTime.time)._i
  const appointmentEndTime = moment(`2023-4-15 ${eachAppointment.appointmentDateTime.time}`).add(30, "m").format("HH:mm")

  const handleSubmit = async () => {
    try {
      const res = await userAppointmentApi.deleteMTG(eachAppointment._id)
      if(res.status === 200){
        setIsMtgDeleteToast(prev => ({...prev, success: true}))
        setIsDeleteMTGModal(false)
        const filteredArray = appointmentList.filter(e => e._id !== eachAppointment._id)
        dispatch(deleteAppointment({filteredArray}))
      }
    } catch (error) {
      setIsMtgDeleteToast(prev => ({...prev, error: true}))
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center py-10 h-screen fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"></div>
      <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col items-center w-4/5 md:w-[40%] h-fit bg-white outline-none focus:outline-none">
        <div onClick={() => setIsDeleteMTGModal(false)} className='flex justify-end absolute top-[2%] right-[3%]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 translate rounded-full hover:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className='text-center text-2xl font-bold my-6'>Cancel meeting?</div>
        <div className='flex flex-col mb-5 w-[80%] md:w-[60%]'>
          <div className='flex justify-center w-full'>
            <p className='basis-[50%]'>Guest name:</p>
            <span className="text-primary basis-[50%]">{eachAppointment.name}</span>
          </div>
          <div className='flex justify-center w-full'>
            <p className='basis-[50%]'>Current date:</p>
            <span className="text-primary basis-[50%]">{formattedDate}</span>
          </div>
          <div className='flex justify-center w-full'>
            <p className='basis-[50%]'>Current time:</p>
            <span className="text-primary basis-[50%]">{`${appointmentStartTime} - ${appointmentEndTime}`}</span>
          </div>
        </div>
        <label className="flex items-center justify-center gap-3 font-bold w-full">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          confirm delete
        </label>
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={!isChecked}
          className="bg-red-400 font-bold text-white rounded-lg w-[60%] md:w-[50%] py-2 my-5 mx-auto disabled:opacity-50 hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
      {isMtgDeleteToast.error && <ToastError props={"Something went wrong... Please try again."} setFunction={setIsMtgDeleteToast}  method={"mtg"} />}
    </div>
  )
}

export default DeleteMTGModal