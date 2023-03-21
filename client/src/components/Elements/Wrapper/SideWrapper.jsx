import React from "react";
import SideMain from "../../User/SideMain";
import SideMenu from "../../User/SideMenu";

const SideWrapper = () => {
  return (
    <>
      <div className="flex" style={{ minHeight: "93vh" }}>
        <div>
          <SideMenu />
        </div>
        <div>
          <SideMain />
        </div>
      </div>
    </>
  );
};

export default SideWrapper;
