import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";

const Availability = () => {
  return (
    <>
      <div className="md:flex w-full">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Set Your Schedule</h1>
          <img
            // src={mypageImg}
            className="w-1/3 h-1/3 mx-auto  my-7 md:w-11/12 md:h-60"
          />

          <h3>Select dates and times for your available scheduled events</h3>
        </TitleWrapper>

        <div className="mt-14 mx-auto w-full">Availability</div>
      </div>
    </>
  );
};

export default Availability;
