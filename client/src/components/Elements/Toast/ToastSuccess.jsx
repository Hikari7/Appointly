import React from "react";
import { useDispatch } from "react-redux";
import { setLoginToast } from "../../../redux/slicers/loginToastSlice";

const Toast = ({ props, method, setFuction }) => {
  const dispatch = useDispatch();

  setTimeout(() => {
    if (method === "login") {
      dispatch(setLoginToast(false));
    } else {
      setFuction(false);
    }
  }, 2000);

  return (
    <>
      <div className="toast toast-top toast-end">
        <div className="alert alert-success">
          <div>
            <span>{props}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
