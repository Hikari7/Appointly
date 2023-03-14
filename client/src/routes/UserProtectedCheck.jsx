import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectCheck = () => {
  const [redirectPath, setRedirectPath] = useState("");
  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (user == null) {
      setRedirectPath("/");
    }
  }, []);

  if (user) {
    return <Navigate to={"mypage"} />;
  } else {
    return <Navigate to={"login"} />;
  }
};

export default UserProtectCheck;
