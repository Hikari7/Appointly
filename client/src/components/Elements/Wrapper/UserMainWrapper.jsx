import React from "react";

const UserMainWrapper = ({ Children }) => {
  return (
    <>
      <div className="mt-14 w-full">{Children}</div>
    </>
  );
};

export default UserMainWrapper;
