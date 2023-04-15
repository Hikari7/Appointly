import { useState } from 'react'
import { HashLink } from 'react-router-hash-link';

import RescheduleModal from '../Modal/RescheduleModal';
import DeleteMTGModal from '../Modal/DeleteMTGModal';

const AppointmentCollapse = ({eachAppointment}) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const [isRescheduleModal, setIsRescheduleModal] = useState(false);
  const [isDeleteMTGModal, setIsDeleteMTGModal] = useState(false);

  return (
    <div
      id={eachAppointment._id}
      tabIndex={0}
      onClick={() => setIsCollapseOpen(!isCollapseOpen)} 
      className="border border-info bg-base-100 rounded-box w-4/6 mx-auto "
    >
      <HashLink smooth to="#appointmentBtns" className="text-xl font-medium flex w-[90%] py-3 mx-auto justify-evenly">
        <p className="mr-3">
          {eachAppointment.appointmentDateTime.date}
        </p>
        <p className="mr-3">
          {eachAppointment.appointmentDateTime.time}
        </p>
        {isCollapseOpen
          ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        }                    
      </HashLink>
      {isCollapseOpen &&                   
        <div className="p-3">
          <p>
            Guest name:{" "}
            <span className="text-primary">
              {eachAppointment.name}
            </span>
          </p>
          <p>
            Guest email:
            <span className="text-primary">
              {eachAppointment.email}
            </span>
          </p>
          <p>
            Comments:
            <span className="text-primary">
              {eachAppointment.message}
            </span>
          </p>
          <p>
            Created at:
            <span className="text-primary">
              {eachAppointment.createdAt}
            </span>
          </p>
          <div id="appointmentBtns" className="flex items-center mx-auto my-2">
            <button
              className="cursor-pointer px-5 py-2 shadow rounded block text-center text-black bg-white hover:bg-green-400 hover:text-white"
              onClick={() => setIsRescheduleModal(!isRescheduleModal)}
            >
              Reschedule
            </button>
            <button
              className="cursor-pointer px-5 py-2 shadow rounded block text-center text-black bg-white hover:bg-green-400 hover:text-white"
              onClick={() => setIsDeleteMTGModal(!isDeleteMTGModal)}
            >
              Cancel MTG
            </button>
          </div>
        </div>
      }
    {isRescheduleModal && <RescheduleModal setIsRescheduleModal={setIsRescheduleModal} eachAppointment={eachAppointment} />}
    {isDeleteMTGModal && <DeleteMTGModal setIsDeleteMTGModal={setIsDeleteMTGModal} eachAppointment={eachAppointment}/>}
    </div>
  )
}

export default AppointmentCollapse