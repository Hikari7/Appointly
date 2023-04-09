import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserHomeWrapper from "../Wrapper/UserHomeWrapper";
import { Outlet } from "react-router";
import { CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlice";
import { persistor } from '../../../redux/store';


const MobileNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const userId = user.userId;
  console.log(isOpen);
  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  const myPage = () => {
    navigate(`/${userId}/mypage`);
    setIsOpen(!isOpen);
  };

  const availability = () => {
    navigate(`/${userId}/availability`);
    setIsOpen(!isOpen);
  };
  const settings = () => {
    navigate(`/${userId}/settings`);
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(setUser(null));
    persistor.purge();
    setIsOpen(!isOpen);
    navigate("/");
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <div className="w-full navbar">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
                onClick={handleClickMenu}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="flex-1 px-2 mx-2  normal-case text-lg font-bold text-primary font-second">
          Appointly
          </div>
        </div>

        <UserHomeWrapper>
          <Outlet />
        </UserHomeWrapper>
      </div>
      {isOpen && (
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-8 pt-16 w-80 text-2xl bg-white ">
            <li onClick={myPage} className="mt-12">
              <a>My page</a>
            </li>
            <li onClick={availability} className="mt-4">
              <a>Availability</a>
            </li>
            <li onClick={settings} className="mt-4">
              <a>Settings</a>
            </li>
            <li
              className="hover:cursor-pointer hover:text-primary  transition duration-200 flex mt-24"
              onClick={logout}
            >
              <div>
                <CiLogout size={40} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
