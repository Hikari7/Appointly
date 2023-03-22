import React from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import UserMainWrapper from "../../components/Elements/Wrapper/UserMainWrapper";

//✅UserMainWrapperでコンポーネント分けると{children}が表示されなくなる

const MyPage = () => {
  return (
    <>
      <div className="md:flex w-full">
        <TitleWrapper>Upcomming Meating</TitleWrapper>
        <div className="mt-14 mx-auto w-full">Mypage</div>
      </div>
    </>
  );
};

export default MyPage;
