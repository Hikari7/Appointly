import React, { useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import settingImg from "../../assets/setting.svg";
import UserInfoChange from "../../components/User/Settings/UserInfoChange";
import PasswordChange from "../../components/User/Settings/PasswordChange";

const Settings = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="md:flex md:w-[93vw] h-full">
        <TitleWrapper>
          <h1 className="text-3xl font-second md:w-10/12 mx-auto">
            Account settings
          </h1>
          <img
            src={settingImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-10/12 md:h-60"
          />
          <h3>Change general settings</h3>
        </TitleWrapper>

        <div className="hidden md:block md:w-5/6 w-full my-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full my-4 md:mx-auto md:w-2/3 px-6 flex items-center justify-center">
              <div className="w-full">
                <UserInfoChange />
                <PasswordChange />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="md:hidden">
          <div className="my-14 w-5/6 mx-auto">
            <div className="flex justify-evenly ">
              <ul className="flex gap-6 list-none">
                <li
                  className={
                    openTab === 1
                      ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400 w-28"
                      : "cursor-pointer px-5 py-2 shadow rounded block text-center text-black bg-white w-28"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                >
                  Profile
                </li>

                <li
                  className={
                    openTab === 2
                      ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400"
                      : "cursor-pointer px-5 py-2 shadow rounded block text-center text-black bg-white"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                >
                  Password
                </li>
              </ul>
            </div>
            {openTab === 1 && <UserInfoChange />}
            {openTab === 2 && <PasswordChange />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
