import { useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import DailyAvailability from "../../components/User/DailyAvailability";
import WeeklyAvailability from "../../components/User/WeeklyAvailability";
import availabilityImg from "../../assets/availability.svg";
import useAvailabilityData from "../../hooks/useAvailabilityData";
import ToastError from "../../components/Elements/Toast/ToastError";
import UserAnimation from "../../utils/Animation/UserAnimation";

const Availability = () => {
  const [openTab, setOpenTab] = useState(1);
  const { isFetching, isError } = useAvailabilityData();

  return (
    <>
      <div className="md:flex md:w-93 h-full ">
        <TitleWrapper
          title={"Set Your Schedule"}
          img={availabilityImg}
          children={"Select your availability dates and times"}
        />
        <div className="my-14 overflow-scroll md:w-5/6 w-full">
          <UserAnimation>
            <div className="flex justify-center">
              <ul
                className={`flex gap-6 list-none mt-[1rem] ${
                  isFetching && "md:absolute md:top-[15%]"
                }`}
              >
                <li className="w-[6rem]">
                  <a
                    className={
                      openTab === 1
                        ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400 w-28 font-second"
                        : "cursor-pointer px-5 py-2 shadow rounded block text-center text-neutral bg-white w-28 font-second"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                  >
                    Weekly
                  </a>
                </li>
                <li className="w-[6rem]">
                  <a
                    className={
                      openTab === 2
                        ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400 w-28 font-second"
                        : "cursor-pointer px-5 py-2 shadow rounded block text-center text-neutral bg-white w-28 font-second"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                  >
                    Daily
                  </a>
                </li>
              </ul>
            </div>
            {isFetching ? (
              <div className="flex justify-center pt-[2rem] md:pt-0">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#F7EDD6]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
              </div>
            ) : (
              <>
                {openTab === 1 && <WeeklyAvailability />}

                {openTab === 2 && <DailyAvailability />}
              </>
            )}
          </UserAnimation>
          {isError && (
            <ToastError props={"Something went wrong... Please try again."} />
          )}
        </div>
      </div>
    </>
  );
};

export default Availability;
