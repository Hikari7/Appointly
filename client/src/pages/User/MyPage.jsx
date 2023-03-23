import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import UserMainWrapper from "../../components/Elements/Wrapper/UserMainWrapper";
import mypageImg from "../../assets/mypage.svg";
import { useSelector } from "react-redux";

//✅UserMainWrapperでコンポーネント分けると{children}が表示されなくなる

const MyPage = () => {
  const appointment = useSelector((state) => state.appointment);
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="md:flex md:w-93 ">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Welcome, Test</h1>
          <img
            src={mypageImg}
            className="w-1/3 h-1/3 mx-auto  my-7 md:w-11/12 md:h-60"
          />
          <h3>You have 2 upcoming meetings!</h3>
        </TitleWrapper>
        <div className="mt-14 md:w-5/6 w-full">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md justify-center w-4/5 mx-auto">
            aaa
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
