import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import userAppointmentApi from "../../api/userAppointmentApi";
import {
  setCheckBox,
  deleteTimeObj,
  removeExtraTimeObj,
} from "../../redux/slicers/availabilitySlice";
import WeeklyAvailabilityInput from "../Elements/Input/WeeklyAvailabilityInput";
import AddCopyBtn from "./AddCopyBtn";
import ToastSuccess from "../Elements/Toast/ToastSuccess";
import ToastError from "../Elements/Toast/ToastError";

const WeeklyAvailability = ({isError: fetchFailed}) => {
  const availability = useSelector((state) => state.availability.weekly);
  const dispatch = useDispatch();
  const param = useParams()
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDelete = (e, dow, data) => {
    e.preventDefault();
    const targetDowObj = availability.find(
      (eachObj) => Object.keys(eachObj)[0] === dow
    );
    const filterdTimeArr = targetDowObj.time.filter(
      (timeObj) => timeObj !== data
    );
    dispatch(deleteTimeObj({ dow, filterdTimeArr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If there are empty inputs, delete those before send data to db.
    const filterdAvailability = availability.map((eachObj) => {
      const filterdTimeArr = eachObj.time.filter(
        (eachTimeObj) =>
          !((eachTimeObj.start === "") | (eachTimeObj.end === ""))
      );
      return { ...eachObj, time: filterdTimeArr };
    });
    const finalAvailability = filterdAvailability.map((eachObj) => {
      if (eachObj.time.length === 0) {
        return { ...eachObj, time: [{ start: "", end: "" }] };
      } else {
        return { ...eachObj };
      }
    });

    dispatch(removeExtraTimeObj(finalAvailability));
    try {
      const res = await userAppointmentApi.set(param.uid, {
        weekly: finalAvailability,
        daily: [],
      });
      if (res.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center w-full ">
      <form className="flex flex-col p-5 w-[90%] md:w-[60%] max-h-full">
        {availability &&
          availability.map((eachObj, objIndex) => (
            // Map out each day of week

            <div
              className="flex justify-between width-full my-4"
              key={objIndex}
            >
              <div className="flex items-start w-full">
                <label className="flex items-center gap-3 font-bold w-[20%]">
                  <input
                    type="checkbox"
                    checked={eachObj[Object.keys(eachObj)[0]]}
                    onChange={() =>
                      dispatch(setCheckBox(Object.keys(eachObj)[0]))
                    }
                  />
                  {Object.keys(eachObj)[0]}
                </label>
                <div className="flex flex-col gap-3">
                  {/* Check each day of week's value (which is boolean). If true, map all elem in time array. */}
                  {availability.find(
                    (elem) => Object.keys(elem)[0] === Object.keys(eachObj)[0]
                  )[Object.keys(eachObj)[0]] ? (
                    availability
                      .find(
                        (elem) =>
                          Object.keys(elem)[0] === Object.keys(eachObj)[0]
                      )
                      .time.map((startEndObj, timeIndex) => {
                        return (
                          <div
                            key={timeIndex}
                            className="flex items-center gap-3 w-[80%] ml-4"
                          >
                            <WeeklyAvailabilityInput
                              eachObj={eachObj}
                              timeIndex={timeIndex}
                              availability={availability}
                              startEndObj={startEndObj}
                              position={"start"}
                            />
                            -
                            <WeeklyAvailabilityInput
                              eachObj={eachObj}
                              timeIndex={timeIndex}
                              availability={availability}
                              startEndObj={startEndObj}
                              position={"end"}
                            />
                            <div className="flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:rounded-full">
                              <svg
                                onClick={(e) =>
                                  handleDelete(
                                    e,
                                    Object.keys(eachObj)[0],
                                    startEndObj
                                  )
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
                        );
                      })
                  ) : (
                    <div className="text-gray-400 w-[80%] ml-5 h-7">
                      Unavailable
                    </div>
                  )}
                </div>
              </div>
              <AddCopyBtn dow={Object.keys(eachObj)[0]} eachObj={eachObj} />
            </div>
          ))}
        <button
          disabled={fetchFailed}
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary normal-case font-bold py-2 my-7 mx-auto w-2/6 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Change Apply
        </button>
      </form>
      {isSuccess && <ToastSuccess props={"Availability changed!"} />}
      {isError && (
        <ToastError props={"Something went wrong... Please try again."} />
      )}
    </div>
  );
};

// export default WeeklyAvailability;
export default WeeklyAvailability;
