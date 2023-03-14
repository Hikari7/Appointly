import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectCheck = () => {
  const [redirectPath, setRedirectPath] = useState("");
  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (user.role !== "admin") {
      setRedirectPath("/");
    }
  }, []);

  if (user.role === "admin") {
    return <Navigate to={"admin/mypage"} />;
  } else {
    return <Navigate to={"login"} />;
  }
};

export default AdminProtectCheck;
