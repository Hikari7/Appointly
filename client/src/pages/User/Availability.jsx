import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import WeeklyAvailability from "../../components/User/WeeklyAvailability"

const Availability = () => {
  return (
    <>
      <div className="md:flex md:w-93">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Set Your Schedule</h1>
          <img
            // src={mypageImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-11/12 md:h-60"
          />

          <h3>Select dates and times for 
            <br></br>your available scheduled events</h3>
        </TitleWrapper>
<<<<<<< HEAD
        <div className="mt-14 md:w-5/6 w-full">Availability</div>
=======

        <div className="mt-14 mx-auto w-full">
          <WeeklyAvailability />
        </div>
>>>>>>> f15e0c4de67201a3198d57285779cd2bf2f1ce64
      </div>
    </>
  );
};

export default Availability;
