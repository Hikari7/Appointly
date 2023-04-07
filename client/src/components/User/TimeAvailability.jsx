import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TimeDropdown from '../Elements/Dropdown/TimeDropdown'
import { addDailyNewTimeObj, deleteDailyTimeObj } from "../../redux/slicers/availbilitySlice"
import userAppointmentApi from '../../api/userAppointmentApi'
import { useParams } from 'react-router'

const TimeAvailability = ({ selectDate, timeArray }) => {
  const dailyAvailability = useSelector((state) => state.availability.daily)
  const dispatch = useDispatch()
  const timeSelector = useRef(null)
  const [modifiedDailyAvailability, setModifiedDailyAvailability] = useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [clickedElem, setClickedElem] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const param = useParams()

  
  useEffect(() => {
    //Logic of close time dropdown by click anywhere.
    const elem = clickedElem
    if(!elem) return 

    const handleCloseTimeDropdown = (e) => {
      if(!(elem === e.target)){
        setSelectedItem("")
        setClickedElem(null)
      }
    }
    document.addEventListener("click", handleCloseTimeDropdown);
    return () => {
      document.removeEventListener("click", handleCloseTimeDropdown);
    };
  }, [selectedItem, clickedElem])

  useEffect(() => {
    // scrollToBottomOfList()
    setModifiedDailyAvailability(dailyAvailability)
    if(!(modifiedDailyAvailability.includes(selectDate))){
      modifiedDailyAvailability.push({date: "", time: [{start: "", end: ""}]})
      setModifiedDailyAvailability(modifiedDailyAvailability)
      console.log(modifiedDailyAvailability);
    }
  }, [])

  const scrollToBottomOfList = () => {
    timeSelector && timeSelector.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const displayTimeDropdown = (id, elem) => {
    setSelectedItem(id)
    setClickedElem(elem)
  }

  const handleMethod = (e, method, data, timeObj) => {
    e.preventDefault()
    if(method === "delete"){
      const targetDateIndex = dailyAvailability.findIndex(eachObj => eachObj.date === data)
      const filteredArr = dailyAvailability[targetDateIndex].filter(elem => elem !== timeObj)
      dispatch(deleteDailyTimeObj({filteredArr, date: data}))
    }else if(method === 'add'){
      dispatch(addDailyNewTimeObj(data))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(isChecked){
      // axios logic to overwrite availability each date as "Unavauable"
      try {
        const res = await userAppointmentApi.set(param.uid, {weekly: [], daily: []})
      } catch (error) {
        console.log(error);
      }      
    }else{
      // axios logic to overwrite availability by daily
      try {
        const res = await userAppointmentApi.set(param.uid, {weekly: [], daily: [{date: selectDate, time: []}]})
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='flex- flex-col'>
      <div className="flex w-full items-center justify-center mb-2">
        <div className="mr-4">Date:</div>
        <div className="text-center py-.5 text-xl md:text-2xl">{selectDate}</div>
      </div>
      <div className=''>
        <label className='flex items-center mx-auto gap-2 w-[20%]'>
          <input 
            type="checkbox" 
            onChange={() => setIsChecked(!isChecked)}
          />
          Unavailable
        </label>
      </div>
      {isChecked
        ? <div className='text-center text-xl m-8'>Unavailable whole day</div>
        : <div className='flex justify-between w-[80%] my-5 mx-auto'>
            <div className='flex flex-col items-center gap-3 w-full relative'>
            {timeArray.length > 0 
              ? timeArray.map((eachTimeObj, eachTimeObjIndex) => (
                <div key={eachTimeObjIndex} className='flex items-center gap-3 w-full'>
                  <div className='relative'>
                    <input
                      type="text"
                      id={`start+${eachTimeObjIndex}`}
                      value={eachTimeObj.start === ""
                        ? "09:00"
                        : eachTimeObj.start
                      }
                      onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                      onChange={(e) => e.target.value}
                      className='border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400'
                    />
                    {/* If selectedItem state is same as clicked input id, render a TimeDropdown component. */}
                    {selectedItem === `start+${eachTimeObjIndex}` && <TimeDropdown position={"start"} from={"daily"} date={eachDateTime.date} eachTimeObjIndex={eachTimeObjIndex} />}
                  </div>
                  -
                  <div className='relative'>
                    <input 
                      type="text"
                      value={eachTimeObj.end === ""
                        ? "17:00"
                        : eachTimeObj.end

                      }
                      id={`end+${eachTimeObjIndex}`}
                      onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                      onChange={(e) => e.target.value}
                      className='border border-gray-700 rounded-lg w-16 h-7 text-center'
                    />
                    {selectedItem === `end+${eachTimeObjIndex}` && <TimeDropdown position={"end"} from={"daily"} date={eachDateTime.date} eachTimeObjIndex={eachTimeObjIndex} />}
                  </div>
                  <div className='flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full'>
                    <svg onClick={(e) => handleMethod(e, "delete", eachDateTime.date, eachTimeObj)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                </div>
              ))
              : modifiedDailyAvailability.map((eachDateTime, dateTimeIndex) => (
                  eachDateTime.time.map((eachTimeObj, timeIndex) => {
                    return (
                      <div key={timeIndex} className='flex items-center gap-3 w-full'>
                        <div className='relative'>
                          <input
                            type="text"
                            id={`start+${timeIndex}`}
                            value={eachTimeObj.start === ""
                              ? "09:00"
                              : eachTimeObj.start
                            }
                            onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                            onChange={(e) => e.target.value}
                            className='border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400'
                          />
                          {/* If selectedItem state is same as clicked input id, render a TimeDropdown component. */}
                          {selectedItem === `start+${timeIndex}` && <TimeDropdown position={"start"} from={"daily"} date={eachDateTime.date} timeIndex={timeIndex} />}
                        </div>
                        -
                        <div className='relative'>
                          <input 
                            type="text"
                            value={eachTimeObj.end === ""
                              ? "17:00"
                              : eachTimeObj.end

                            }
                            id={`end+${timeIndex}`}
                            onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                            onChange={(e) => e.target.value}
                            className='border border-gray-700 rounded-lg w-16 h-7 text-center'
                          />
                          {selectedItem === `end+${timeIndex}` && <TimeDropdown position={"end"} from={"daily"} date={eachDateTime.date} timeIndex={timeIndex} />}
                        </div>
                        <div className='flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full'>
                          <svg onClick={(e) => handleMethod(e, "delete", eachDateTime.date, eachTimeObj)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </div>
                      </div>    
              )})))
            }          
            </div>
            <button ref={timeSelector} onClick={(e) => handleMethod(e, "add", selectDate)} className='flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
      }
      <div className='flex justify-center'>
        <button onClick={(e) => handleSubmit(e)} className='w-[80%] py-1 px-2 m-8 border bg-green-400 text-white rounded-lg hover:bg-green-500'>
          Set daily availability
        </button>
      </div>
    </div>
  )
}

export default TimeAvailability