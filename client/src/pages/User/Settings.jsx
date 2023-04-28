import React, { useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import settingImg from "../../assets/setting.svg";
import UserInfoChange from "../../components/User/Settings/UserInfoChange";
import PasswordChange from "../../components/User/Settings/PasswordChange";
import UserAnimation from "../../utils/Animation/UserAnimation";

const Settings = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <div className="md:flex md:w-[93vw] h-full">
        <TitleWrapper
          title={"Account settings"}
          img={settingImg}
          children={"Change general settings"}
        />
        <div className="hidden md:block md:w-5/6 w-full my-auto">
          <UserAnimation>
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full my-4 md:mx-auto md:w-2/3 px-6 flex items-center justify-center">
                <div className="w-full">
                  <UserInfoChange />
                  <PasswordChange />
                </div>
              </div>
            </div>
          </UserAnimation>
        </div>
      </div>
      <div>
        <div className="md:hidden">
          <UserAnimation>
            <div className="my-14 w-5/6 mx-auto">
              <div className="flex justify-evenly ">
                <ul className="flex gap-5 list-none">
                  <li
                    className={
                      openTab === 1
                        ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400 w-28 font-second"
                        : "cursor-pointer px-5 py-2 shadow rounded block text-center text-neutral bg-white w-28 font-second"
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
                        ? "cursor-pointer px-5 py-2 shadow rounded block text-center text-white bg-green-400 font-second"
                        : "cursor-pointer px-5 py-2 shadow rounded block text-center text-neutral bg-white font-second"
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
              {openTab === 1 && (
                <UserAnimation>
                  <UserInfoChange />
                </UserAnimation>
              )}
              {openTab === 2 && (
                <UserAnimation>
                  <PasswordChange />
                </UserAnimation>
              )}
            </div>
          </UserAnimation>
        </div>
      </div>
    </>
  );
};

export default Settings;
