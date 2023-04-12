import TimeDropdown from '../Elements/dropdown/TimeDropdown'

const EachTimeInput = ({ position, eachTimeObjIndex, eachTimeObj, selectedItem, displayTimeDropdown }) => {
  return (
    <div className='relative'>
      <input
        type="text"
        id={`${position}+${eachTimeObjIndex}`}
        value={(eachTimeObj[position] === "")
          ? (position === "start")? "09:00": "17:00"
          : eachTimeObj[position]
        }
        onClick={(e) => displayTimeDropdown(e.target.id, e.currentTarget)}
        onChange={(e) => e.target.value}
        className='border border-gray-700 rounded-lg w-16 h-7 text-center focus:border-green-400'
      />
      {/* If selectedItem state is same as clicked input id, render a TimeDropdown component. */}
      {selectedItem === `${position}+${eachTimeObjIndex}` && <TimeDropdown position={position} from={"daily"} eachTimeObjIndex={eachTimeObjIndex} />}
    </div>  
    )
}

export default EachTimeInput