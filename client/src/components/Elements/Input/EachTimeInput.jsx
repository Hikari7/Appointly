import { useContext } from "react";

import TimeDropdown from "../dropdown/TimeDropdown";
import { TargetTime } from "../../User/DailyAvailability";

const EachTimeInput = ({
  position,
  eachTimeObjIndex,
  selectedItem,
  displayTimeDropdown,
}) => {
  const { currentAvailbleTime, setCurrentAvailbleTime } = useContext(TargetTime)

  const dailyTimeHandle = (time) => {
    const tempTimeObj = {start: currentAvailbleTime[eachTimeObjIndex].start, end: currentAvailbleTime[eachTimeObjIndex].end};
    tempTimeObj[position] = time;
    setCurrentAvailbleTime(
      currentAvailbleTime.map((item, index) => {
        if(index === eachTimeObjIndex){
          return tempTimeObj
        }else{
          return item
        }
      })
    )
  }

  return (
    <div className="relative">
      <input
        type="text"
        id={`${position}+${eachTimeObjIndex}`}
        value={currentAvailbleTime[eachTimeObjIndex][position]}
        onChange={dailyTimeHandle}
        onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
        className="border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400"
      />
      {/* If selectedItem state is same as clicked input id, render a TimeDropdown component. */}
      {selectedItem === `${position}+${eachTimeObjIndex}` && (
        <TimeDropdown
          position={position}
          from={"daily"}
          eachTimeObjIndex={eachTimeObjIndex}
          dailyTimeHandle={dailyTimeHandle}
        />
      )}
    </div>
  );
};

export default EachTimeInput;
