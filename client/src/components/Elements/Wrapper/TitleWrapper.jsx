import React from "react";

const TitleWrapper = ({ children }) => {
  return (
    <div className="md:w-1/5  md:border-r border-neutral border-thin md:h-93 justify-center flex-col flex items-center text-center">
      <div className="h-4/5 md:h-4/6 mt-10 flex-col flex justify-center">{children}</div>
    </div>
  );
};

export default TitleWrapper;
