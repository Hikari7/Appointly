import React from "react";

const TitleWrapper = ({ children }) => {
  return (
    <div className="md:border-r border-neutral border-thin justify-center flex-col flex items-center text-center md:w-3/12 pt-14 md:pt-0">
      {children}
    </div>
  );
};

export default TitleWrapper;
