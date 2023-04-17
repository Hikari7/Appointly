import { useState, useEffect, useRef, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import moment from 'moment'

import userAppointmentApi from '../../api/userAppointmentApi'
import EachTimeInput from '../Elements/Input/EachTimeInput'
import { setDailyAvailability } from '../../redux/slicers/availabilitySlice'
import { TargetTime } from './DailyAvailability'
import ToastSuccess from "../Elements/Toast/ToastSuccess";
import ToastError from "../Elements/Toast/ToastError";

const TimeAvailability = ({ selectDate }) => {
  const dispatch = useDispatch()
  const timeSelector = useRef(null)
  const param = useParams()
  const { currentAvailbleTime, setCurrentAvailbleTime } = useContext(TargetTime)
  const [selectedItem, setSelectedItem] = useState("")
  const [clickedElem, setClickedElem] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const formattedDate = moment(selectDate).format("MMM DD, YYYY");

  useEffect(() => {
    //Logic of close time dropdown by click anywhere.
    const elem = clickedElem;
    if (!elem) return;

    const handleCloseTimeDropdown = (e) => {
      if (!(elem === e.target)) {
        setSelectedItem("");
        setClickedElem(null);
      }
    };
    document.addEventListener("click", handleCloseTimeDropdown);
    return () => {
      document.removeEventListener("click", handleCloseTimeDropdown);
    };
  }, [selectedItem, clickedElem]);

  useEffect(() => {
    setIsChecked(false);
    if (
      currentAvailbleTime.length === 1 &&
      JSON.stringify(currentAvailbleTime[0]) ===
        JSON.stringify({ start: "", end: "" })
    ) {
      setIsChecked(true);
    }
  }, [currentAvailbleTime]);

  const handleCheckbox = () => {
    if (!isChecked) {
      setCurrentAvailbleTime([{ start: "", end: "" }]);
      setIsChecked(false);
    } else {
      setCurrentAvailbleTime([{ start: "09:00", end: "17:00" }]);
      setIsChecked(true);
    }
  };

  const displayTimeDropdown = (id, elem) => {
    setSelectedItem(id);
    setClickedElem(elem);
  };

  const handleMethod = (e, method, data, timeObj) => {
    e.preventDefault();
    if (method === "delete") {
      const filteredArr = currentAvailbleTime.filter(
        (eachTimeObj) => eachTimeObj !== timeObj
      );
      if (filteredArr.length === 0) {
        setIsChecked(true);
        // filteredArr.push({start: "00:00", end: "00:00"})
      }
      setCurrentAvailbleTime(filteredArr);
    } else if (method === "add") {
      const timeObj = { start: "", end: "" };
      setCurrentAvailbleTime((prev) => [...prev, timeObj]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChecked) {
      // axios logic to overwrite availability each date as "Unavauable"
      try {
        const res = await userAppointmentApi.set(param.uid, {weekly: [], daily: [{date: selectDate, time: []}], target: "daily"})
        if(res.status === 200){
          setIsSuccess(true)
        }
        dispatch(
          setDailyAvailability({ date: selectDate, time: currentAvailbleTime })
        );
      } catch (error) {
        console.log(error);
        setIsError(true)
      }      
    }else{
      // axios logic to overwrite availability by daily
      try {
        const res = await userAppointmentApi.set(param.uid, {weekly: [], daily: [{date: selectDate, time: currentAvailbleTime}], target: "daily"})
        if(res.status === 200){
          setIsSuccess(true)
        }
        dispatch(setDailyAvailability({date: selectDate, time: currentAvailbleTime}))
      } catch (error) {
        console.log(error);
        setIsError(true)
      }
    }
  };

  return (
    <div className="flex flex-col w-[70%] md:py-5 md:w-[50%]">
      <div className="flex w-full items-center justify-center mb-2">
        <div className="mr-4">Date:</div>
        <div className="text-center py-.5 text-xl md:text-2xl">
          {formattedDate}
        </div>
      </div>
      <div>
        <label className="flex items-center justify-center mx-auto gap-2 w-[20%]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
          Unavailable
        </label>
      </div>
      {isChecked ? (
        <div className="text-center text-xl m-7">Unavailable whole day</div>
      ) : (
        <div className="flex justify-between w-[80%] my-5 mx-auto">
          <div className="flex flex-col items-center gap-3 w-full relative">
            {/* If weekly availability is set, show that available time. */}
            {currentAvailbleTime &&
              currentAvailbleTime.map((eachTimeObj, eachTimeObjIndex) => (
                <div
                  key={eachTimeObjIndex}
                  className="flex items-center gap-3 w-full"
                >
                  <EachTimeInput
                    position={"start"}
                    eachTimeObjIndex={eachTimeObjIndex}
                    eachTimeObj={eachTimeObj}
                    selectDate={selectDate}
                    selectedItem={selectedItem}
                    displayTimeDropdown={displayTimeDropdown}
                  />
                  -
                  <EachTimeInput
                    position={"end"}
                    eachTimeObjIndex={eachTimeObjIndex}
                    eachTimeObj={eachTimeObj}
                    selectDate={selectDate}
                    selectedItem={selectedItem}
                    displayTimeDropdown={displayTimeDropdown}
                  />
                  <div className="flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full">
                    <svg
                      onClick={(e) =>
                        handleMethod(e, "delete", selectDate, eachTimeObj)
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              ))}
          </div>
          <button
            ref={timeSelector}
            onClick={(e) => handleMethod(e, "add", selectDate)}
            className="flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      )}
      <div id="setBtn" className="flex justify-center">
        <button
          onClick={(e) => handleSubmit(e)}
          className="w-[80%] py-1 px-2 m-8 border bg-green-400 text-white rounded-lg hover:bg-green-500"
        >
          Set daily availability
        </button>
      </div>
      {isSuccess && <ToastSuccess props={"Successfully availability is changed!"} />}
      {isError && <ToastError props={"Something went wrong... Please try again."} />}
    </div>
  );
};

export default TimeAvailability;
