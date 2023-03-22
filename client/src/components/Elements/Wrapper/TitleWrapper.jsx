import React from "react";

const TitleWrapper = ({ children }) => {
  return (
    <div className="w-1/5  md:border-r border-neutral border-thin md:h-93">
      {children}
    </div>
  );
};

export default TitleWrapper;
