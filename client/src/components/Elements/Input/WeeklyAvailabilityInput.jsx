import { useState, useEffect } from 'react'
import TimeDropdown from '../dropdown/TimeDropdown';

const WeeklyAvailabilityInput = ({eachObj, timeIndex, availability, startEndObj, position}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [clickedElem, setClickedElem] = useState(null);

  useEffect(() => {
    //Logic of close time dropdown by click anywhere.
    if (!clickedElem) return;

    const handleCloseTimeDropdown = (e) => {
      // console.log({clickedElem});
      // console.log({e: e.target});
      if (!(clickedElem === e.target)) {
        setSelectedItem("");
        setClickedElem(null);
      }
    };
    document.addEventListener("click", handleCloseTimeDropdown);
    return () => {
      document.removeEventListener("click", handleCloseTimeDropdown);
    };
  }, [selectedItem, clickedElem]);

  const displayTimeDropdown = (id, elem) => {
    setSelectedItem(id);
    setClickedElem(elem);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={`${Object.keys(eachObj)[0]}+${position}+${timeIndex}`}
        value={
          // If time array is initial state (which means no elem in time array), set the value manually.
          availability && 
            availability.find((elem) => Object.keys(elem)[0] === Object.keys(eachObj)[0]).time[0].start === ""
            ? "09:00"
            : startEndObj[position]
        }
        onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
        onChange={(e) => e.target.value}
        className="border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400"
      />
      {/* If selectedItem state is same as clicked input id, render a TimeDropdown component. */}
      {selectedItem === `${Object.keys(eachObj)[0]}+${position}+${timeIndex}` && (
        <TimeDropdown
          position={position}
          selectedItem={selectedItem}
          timeIndex={timeIndex}
          from={"weekly"}
        />
      )}
    </div>
  )
}

export default WeeklyAvailabilityInput