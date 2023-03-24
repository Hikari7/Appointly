import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';


import { setAvailability } from '../../redux/slicers/availbilitySlice'
import TimeDropdown from '../Elements/dropdown/TimeDropdown'

const initialState = [
  {Sun: false, time: [{start: "09:00", end: "17:00"}]},
  {Mon: false, time: [{start: "09:00", end: "17:00"}]},
  {Tue: false, time: [{start: "09:00", end: "17:00"}]},
  {Wed: false, time: [{start: "09:00", end: "17:00"}]},
  {Thu: false, time: [{start: "09:00", end: "17:00"}]},
  {Fri: false, time: [{start: "09:00", end: "17:00"}]},
  {Sat: false, time: [{start: "09:00", end: "17:00"}]},
]

const WeeklyAvailability = () => {
  const availability = useSelector((state) => state.availability.availability)
  const dispatch = useDispatch()
  const [selectedDow, setSelectedDow] = useState(initialState)
  const [selectedItem, setSelectedItem] = useState("")
  const [targetElem, setTargetElem] = useState(null)

  useEffect(() => {
    const elem = targetElem
    if(!elem) return 

    const handleCloseTimeDropdown = (e) => {
      if(!(elem === e.target)){
        setSelectedItem("")
      }
    }

    document.addEventListener("click", handleCloseTimeDropdown);
    return () => {
      document.removeEventListener("click", handleCloseTimeDropdown);
    };
  }, [targetElem])

  const handleCheckbox = (e) => {
    const targetDow = e.target.value
    const targetDowObj = selectedDow.find(eachDow => Object.keys(eachDow)[0] === targetDow)
    if(!(targetDowObj[targetDow])){
      setSelectedDow((prev) => {
        const targetDowObj = prev.findIndex(eachDow => Object.keys(eachDow)[0] === targetDow)
        prev[targetDowObj][targetDow] = true
        return [...prev]
      })
    }else{
      setSelectedDow((prev) => {
        const targetDowObj = prev.findIndex(eachDow => Object.keys(eachDow)[0] === targetDow)
        prev[targetDowObj][targetDow] = false
        return [...prev]
      })
    }
  }


  const displayDow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const displayTimeDropdown = (id, elem) => {
    setSelectedItem(id)
    setTargetElem(elem)

  }

  const handleMethod = (meyhod, targetObj) => {
    if(meyhod === "delete"){
      
    }else if('add'){
      
    }else{

    }
  }

  return (
    <form className='flex flex-col p-5 md:w-[60%]'>
      {displayDow.map((eachDow, dowIndex) => (
        <div key={dowIndex} className='flex justify-between width-full my-4'>
          <div className='flex justify-between w-full'>
            <label className='flex items-center gap-3 font-bold w-[20%]'>
              <input 
                type="checkbox" 
                value={eachDow}
                onChange={handleCheckbox}
                className='' 
              />
              {eachDow}
            </label>
            {selectedDow.find(elem => Object.keys(elem)[0] === eachDow)[eachDow]
              ? (
                selectedDow.find(elem => Object.keys(elem)[0] === eachDow).time.map((startEndObj, index) => {
                  return (
                  <div key={index} className='flex items-center gap-3 w-[80%] ml-4 relative'>
                    <div className='relativ'>
                      <input
                        type="text"
                        id={`${eachDow}Start`}
                        value={startEndObj.start}
                        onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
                        onChange={(e) => e.target.value}
                        className='border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400'
                      />
                      {selectedItem === `${eachDow}Start` && <TimeDropdown left={"-7"} />}
                    </div>
                    -
                    <div className='relativ'>
                      <input 
                        type="text"
                        value={startEndObj.end}
                        id={`${eachDow}End`}
                        onClick={(e) => displayTimeDropdown(e.target.id)}
                        onChange={(e) => e.target.value}
                        className='border border-gray-700 rounded-lg w-16 h-7 text-center'
                      />
                      {selectedItem === `${eachDow}End` && <TimeDropdown left={"31"} />}
                    </div>
                    <svg onClick={() => handleClick("delete", startEndObj)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                )}))
              : <div className='text-gray-400 w-[80%] ml-5 h-7'>Unavailable</div>
            }
            
          </div>
          
          {selectedDow.find(elem => Object.keys(elem)[0] === eachDow)[eachDow]
            ? <div className='flex gap-3'>
                <button onClick={() => handleClick("add")} className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <button onClick={() => handleClick("copy")} className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </button>
              </div>
            : <div className='flex gap-3'>
                <button className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <button className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </button>
              </div>
          }
        </div>
      ))}
      <button
        type='submit'
        className='bg-green-400 font-bold text-white rounded-lg w-[30%] py-2 my-5 mx-auto'
      >
        Change apply
      </button>
    </form>
  )
}

export default WeeklyAvailability


