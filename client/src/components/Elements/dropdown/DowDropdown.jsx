import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { copyWeeklyAvailability } from "../../../redux/slicers/availabilitySlice"

const initialValue = [
    {Sun: false},
    {Mon: false},
    {Tue: false},
    {Wed: false},
    {Thu: false},
    {Fri: false},
    {Sat: false},
  ]

const DowDropdown = ({selectedDowObj, setIsDowDropdownOpen}) => {
  const [dowStates, setDowStates] = useState(initialValue)
  const dispatch = useDispatch()

  const handleCheck = (dowObj) => {
    if(Object.values(dowObj)[0]){
      const newObj = dowStates.map(e => {
        if(Object.keys(e)[0] === Object.keys(dowObj)[0]){
          return {[Object.keys(e)[0]]: false}
        }else{
          return {...e}
        }
      })
      setDowStates(newObj)
    }else{
      const newObj = dowStates.map(e => {
        if(Object.keys(e)[0] === Object.keys(dowObj)[0]){
          return {[Object.keys(e)[0]]: true}
        }else{
          return {...e}
        }
      })
      setDowStates(newObj)
    }
  }

  const handleCopyAvailability = (e) => {
    e.preventDefault()
    try {
      const baseTimeArr = selectedDowObj.time
      const targetDowObj = dowStates.filter(eachDowObj => Object.values(eachDowObj)[0])
      const targetDowArray = targetDowObj.map(eachDowObj => Object.keys(eachDowObj)[0])
      dispatch(copyWeeklyAvailability({baseTimeArr, targetDowArray}))
      setIsDowDropdownOpen(false)
    } catch (error) {
      console.log(error);    
    }
  }

  return (
    <div className="flex flex-col bg-white gap-1 m-4 px-1.5 pt-3 border-2 border-green-400 rounded-lg w-[500%] h-fit overflow-y-scroll absolute top-[30%] right-[-40%] z-50">
      <div className='text-center mb-3'>Copy times to ...</div>
      {dowStates && dowStates.map((eachDowObj, index) => (
        <label key={index} className='flex items-center font-bold ml-3'>
          <input 
            type="checkbox" 
            checked={Object.values(eachDowObj)[0]}
            onChange={() => handleCheck(eachDowObj)}
            className='mr-10' 
          />
          {Object.keys(eachDowObj)[0]}
        </label>
      ))}
      <button
        onClick={handleCopyAvailability}
        disabled={dowStates.findIndex(eachDowObj => Object.values(eachDowObj)[0]) === -1 }
        className='bg-green-400 font-bold text-white rounded-lg w-full py-2 my-5 mx-auto disabled:opacity-30'>
        Apply
      </button>
    </div>
  )
}

export default DowDropdown