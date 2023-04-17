import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DowDropdown from '../Elements/dropdown/DowDropdown'
import { addNewTimeObj } from '../../redux/slicers/availabilitySlice'

const AddCopyBtn = ({ dow, eachObj }) => {
  const availability = useSelector((state) => state.availability.weekly);
  const dispatch = useDispatch()
  const copyIcon = useRef()
  const [isDowDropdownOpen, setIsDowDropdownOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (copyIcon.current && !copyIcon.current.contains(e.target)) {
        setIsDowDropdownOpen(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [copyIcon]);

  const handleMethod = (e, method, dow) => {
    e.preventDefault()
    if(method === "add"){
      dispatch(addNewTimeObj(dow));
    } else if (method === "copy") {
      setIsDowDropdownOpen(!isDowDropdownOpen);
    }
  }

  return (
    //  Check each day of week's value (which is boolean), and conditional rendering for action btns
    availability && availability.find((elem) => Object.keys(elem)[0] === Object.keys(eachObj)[0])[Object.keys(eachObj)[0]]
      ? <div className="flex gap-3 md:gap-1">
          <button
            onClick={(e) => handleMethod(e, "add", dow)}
            className="flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <div ref={copyIcon} className="relative">
            <button          
              onClick={(e) => handleMethod(e, "copy", dow)}   
              className="flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600" >
                <path strokeLinecap="round" strokeLinejoin="round"  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
              </svg>
            </button>
            {isDowDropdownOpen && (<DowDropdown selectedDowObj={eachObj} setIsDowDropdownOpen={setIsDowDropdownOpen} />)}
          </div>
        </div>
        
      : <div className="flex gap-3">
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
            </svg>
          </div>
        </div>
    

    
  )
}

export default AddCopyBtn