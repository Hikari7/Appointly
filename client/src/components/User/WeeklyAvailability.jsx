import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userAppointmentApi from "../../api/userAppointmentApi"
import { setCheckBox, addNewTimeObj, deleteTimeObj, removeExtraTimeObj } from '../../redux/slicers/availabilitySlice'
import TimeDropdown from '../Elements/Dropdown/TimeDropdown'
import { useParams } from 'react-router'
import DowDropdown from '../Elements/Dropdown/DowDropdown'

const WeeklyAvailability = () => {
  const availability = useSelector((state) => state.availability.weekly)
  const dispatch = useDispatch()
  const param = useParams()
  const [selectedItem, setSelectedItem] = useState("")
  const [clickedElem, setClickedElem] = useState(null)
  const [dowId, setDowId] = useState(null)

  useEffect(() => {
    //Logic of close time dropdown by click anywhere.
    if(!clickedElem) return 

    const handleCloseTimeDropdown = (e) => {
      if(!(clickedElem === e.target)){
        setSelectedItem("")
        setClickedElem(null)
      }
    }
    document.addEventListener("click", handleCloseTimeDropdown);
    return () => {
      document.removeEventListener("click", handleCloseTimeDropdown);
    };
  }, [selectedItem, clickedElem])

  const handleCheckbox = (data) => {
    dispatch(setCheckBox(data))
  }

  const displayTimeDropdown = (id, elem) => {
    setSelectedItem(id)
    setClickedElem(elem)
  }

  const handleMethod = (e, method, dow, data) => {
    e.preventDefault()
    if(method === "delete"){
      const targetDowObj = availability.find(eachObj => Object.keys(eachObj)[0] === dow)
      const filterdTimeArr = targetDowObj.time.filter(timeObj => timeObj !== data)
      dispatch(deleteTimeObj({dow, filterdTimeArr}))
    }else if(method === 'add'){
      dispatch(addNewTimeObj(dow))
    }else if(method === 'copy'){
      if(!dowId){
        setDowId(dow)
      }else{
        setDowId(null)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // If there are empty inputs, delete those before send data to db.
    // const filterdAvailability = Array.from(new Map(availability.map(eachObj => {
    //   const newArray = [...new Set(eachObj.time)]
    //   return {...eachObj, time: newArray}  
    //   const filterdTimeArr = eachObj.time.filter(eachTimeObj => !(eachTimeObj.start === "" | eachTimeObj.end ===""))
    //   return {...eachObj, time: filterdTimeArr}  
    // })))

    // console.log(filterdAvailability);

    // dispatch(removeExtraTimeObj(filterdAvailability))
    try {
      const res = await userAppointmentApi.set(param.uid, {weekly: availability, daily: []})
      if(res.status === 200){
        alert("Successfully availability was changed!")
      }
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <div className='flex justify-center w-full'>
      <form className='flex flex-col p-5 w-[90%] md:w-[60%]'>
        {availability && availability.map((eachObj, objIndex) => (
          // Map out each day of week
          <div key={objIndex} className='flex justify-between width-full my-4'>
            <div className='flex items-start w-full'>
              <label className='flex items-center gap-3 font-bold w-[20%]'>
                <input 
                  type="checkbox" 
                  checked={eachObj[Object.keys(eachObj)[0]]}
                  onChange={() => handleCheckbox(Object.keys(eachObj)[0])}
                  className='' 
                />
                {Object.keys(eachObj)[0]}
              </label>
              <div className='flex flex-col gap-3'>

                {/* Check each day of week's value (which is boolean). If true, map all elem in time array. */}
                {availability && availability.find(elem => Object.keys(elem)[0] === Object.keys(eachObj)[0])[Object.keys(eachObj)[0]]
                  ? (
                    availability && availability.find(elem => Object.keys(elem)[0] === Object.keys(eachObj)[0]).time.map((startEndObj, timeIndex) => {
                      return (
                      <div key={timeIndex} className='flex items-center gap-3 w-[80%] ml-4'>
                        <div className='relative'>
                          <input
                            type="text"
                            id={`${Object.keys(eachObj)[0]}+start+${timeIndex}`}
                            value={
                              // If time array is initial state (which means no elem in time array), set the value manually.
                              availability && availability.find(elem => Object.keys(elem)[0] === Object.keys(eachObj)[0]).time[0].start === ""
                              ? "09:00"
                              : startEndObj.start
                            }
                            onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                            onChange={(e) => e.target.value}
                            className='border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400'
                          />
                          {/* If selectedItem state is same as clicked input id, render a TimeDropdown component. */}
                          {selectedItem === `${Object.keys(eachObj)[0]}+start+${timeIndex}` && <TimeDropdown position={"start"} selectedItem={selectedItem} timeIndex={timeIndex} from={"weekly"} />}
                        </div>
                        -
                        <div className='relative'>
                          <input 
                            type="text"
                            value={
                              availability && availability.find(elem => Object.keys(elem)[0] === Object.keys(eachObj)[0]).time[0].end === ""
                              ? "17:00"
                              : startEndObj.end
                            }
                            id={`${Object.keys(eachObj)[0]}+end+${timeIndex}`}
                            onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                            onChange={(e) => e.target.value}
                            className='border border-gray-700 rounded-lg w-16 h-7 text-center'
                          />
                          {selectedItem === `${Object.keys(eachObj)[0]}+end+${timeIndex}` && <TimeDropdown selectedItem={selectedItem} timeIndex={timeIndex} from={"weekly"} />}
                        </div>
                        <div className='flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full'>
                          <svg onClick={(e) => handleMethod(e, "delete", Object.keys(eachObj)[0], startEndObj)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </div>
                      </div>
                    )}))
                  : <div className='text-gray-400 w-[80%] ml-5 h-7'>Unavailable</div>
                }
              </div>            
            </div>
            
            {/* Check each day of week's value (which is boolean), and conditional rendering for action btns */}
            {availability && availability.find(elem => Object.keys(elem)[0] === Object.keys(eachObj)[0])[Object.keys(eachObj)[0]]
              ? <div className='flex gap-3 md:gap-1'>
                  <button onClick={(e) => handleMethod(e, "add", Object.keys(eachObj)[0])} className='flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  <div className='relative'>
                    <button id={Object.keys(eachObj)[0]} onClick={(e) => handleMethod(e, "copy", Object.keys(eachObj)[0])} className='flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                      </svg>
                    </button>
                    {/* {selectedDow === Object.keys(eachObj)[0] && <DowDropdown selectedDow={Object.keys(eachObj)[0]}/>} */}
                    {dowId === Object.keys(eachObj)[0] && <DowDropdown selectedDowObj={eachObj}/>}
                  </div>
                </div>
              : <div className='flex gap-3'>
                  <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                  </div>
                </div>
            }
          </div>
        ))}
        <button
          onClick={e => handleSubmit(e)}
          className='bg-green-400 font-bold text-white rounded-lg w-[30%] md:w-[50%] py-2 my-5 mx-auto'
        >
          Change apply
        </button>
      </form>
    </div>
  )
}

export default WeeklyAvailability







