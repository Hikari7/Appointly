import React from "react";
import UserAnimation from "../../../utils/userAnimation";

const TitleWrapper = ({ title, img, children }) => {
  return (
    <>
      <div className="md:border-r border-neutral border-thin justify-center flex-col flex items-center text-center md:w-3/12 pt-14 md:pt-0">
        <UserAnimation>
          <h1 className="text-3xl font-second md:w-10/12 mx-auto">{title}</h1>
          <img
            src={img}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-10/12 md:h-60"
          />
          <h3 className="break-words">{children}</h3>
        </UserAnimation>
      </div>
    </>
  );
};

export default TitleWrapper;
