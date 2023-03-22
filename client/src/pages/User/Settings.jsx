import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";

const Settings = () => {
  return (
    <>
      <div className="md:flex w-full">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Account settings</h1>
          <img
            // src={mypageImg}
            className="w-1/3 h-1/3 mx-auto  my-7 md:w-11/12 md:h-60"
          />

          <h3>Check your account information</h3>
        </TitleWrapper>

        <div className="mt-14 mx-auto w-full">Account settings</div>
      </div>
    </>
  );
};

export default Settings;
