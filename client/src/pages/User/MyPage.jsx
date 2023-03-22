import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import UserMainWrapper from "../../components/Elements/Wrapper/UserMainWrapper";
import mypageImg from "../../assets/mypage.svg";

//✅UserMainWrapperでコンポーネント分けると{children}が表示されなくなる

const MyPage = () => {
  return (
    <>
      <div className="md:flex w-full ">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Upcomming Meetings</h1>
          <img
            src={mypageImg}
            className="w-1/3 h-1/3 mx-auto  my-7 md:w-11/12 md:h-60"
          />
          {/* ✅propbably lengthで数字出す */}
          {/* <h3>You have 2 upcoming meeting</h3> */}
          <h3>You have 2 upcoming meetings!</h3>
        </TitleWrapper>
        <div className="mt-14 mx-auto w-full">Mypage</div>
      </div>
    </>
  );
};

export default MyPage;
