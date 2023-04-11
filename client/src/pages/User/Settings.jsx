import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import settingImg from "../../assets/setting.svg";
import UserInfoChange from "../../components/User/Settings/UserInfoChange";
import PasswordChange from "../../components/User/Settings/PasswordChange";

const Settings = () => {
  return (
    <>
      <div className="md:flex md:w-93 ">
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

        <div className="mt-14 md:w-5/6 w-full">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-white w-full my-4 md:mx-auto md:w-2/3 px-6 flex items-center justify-center">
              <div className="w-full">
                <UserInfoChange />
                <PasswordChange />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
