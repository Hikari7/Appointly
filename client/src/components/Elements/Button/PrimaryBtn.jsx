import React from "react";

const PrimaryBtn = ({ onClick, props }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary normal-case font-bold py-2 w-28"
    >
      {props}
    </button>
  );
};

export default PrimaryBtn;
