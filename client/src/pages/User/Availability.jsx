import { useState } from "react";

import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import DailyAvailability from "../../components/User/DailyAvailability";
import WeeklyAvailability from "../../components/User/weeklyAvailability";


const Availability = () => {
  const [openTab, setOpenTab] = useState(1)

  return (
    <>
      <div className="md:flex md:w-93">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Set Your Schedule</h1>
          <img
            // src={mypageImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-11/12 md:h-60"
          />

          <h3>
            Select dates and times for
            <br></br>your available scheduled events
          </h3>
        </TitleWrapper>

        {/* <div className="mt-14 md:w-5/6 w-full">Availability</div> */}

        <div className="mt-5 mx-auto w-full">
          <div className="flex justify-center">
            <ul className="flex gap-2 list-none">
              <li className="w-[6rem]">
                <a 
                  className={
                    openTab === 1
                      ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400"
                      : "cursor-pointer px-5 py-2 shadow rounded block text-center text-black bg-white"
                  }
                  onClick={e => { e.preventDefault(); setOpenTab(1); }}
                >
                  Weekly
                </a>
              </li> 
              <li className="w-[6rem]">
                <a 
                  className={
                    openTab === 2
                      ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400"
                      : "cursor-pointer px-5 py-2 shadow rounded block text-center text-black bg-white"
                  }
                  onClick={e => { e.preventDefault(); setOpenTab(2); }}
                >
                  Daily
                </a>
              </li>
            </ul>
          </div>
          {openTab === 1 && <WeeklyAvailability />}
          {openTab === 2 && <DailyAvailability />}          
        </div>
      </div>
    </>
  );
};

export default Availability;

// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/tabs/text
