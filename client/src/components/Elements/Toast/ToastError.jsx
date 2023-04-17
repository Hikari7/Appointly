import React from "react";

const Toast = ({ props, setFunction }) => {
  setTimeout(() => {
    setFunction(false);
  }, 2000);

  return (
    <>
      <div className="toast toast-top toast-end">
        <div className="alert alert-error">
          <div>
            <span>{props}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
