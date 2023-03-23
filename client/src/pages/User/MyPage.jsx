import React, { useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import UserMainWrapper from "../../components/Elements/Wrapper/UserMainWrapper";
import mypageImg from "../../assets/mypage.svg";
import { useSelector } from "react-redux";
import { FiCopy, FiCheck } from "react-icons/fi";

//✅UserMainWrapperでコンポーネント分けると{children}が表示されなくなる

const MyPage = () => {
  const appointment = useSelector((state) => state.appointment);
  const user = useSelector((state) => state.user);

  const [copyLink, setCopyLink] = useState(false);

  const handleCopyLink = () => {
    setCopyLink(true);
    //ここでrouter呼び出す
  };

  console.log(copyLink);
  return (
    <>
      <div className="md:flex md:w-93 ">
        <TitleWrapper>
          <h1 className="text-3xl font-second">Welcome, Test</h1>
          <img
            src={mypageImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-11/12 md:h-60"
          />
          <h3>You have 2 upcoming meetings!</h3>
        </TitleWrapper>
        <div className="mt-14 md:w-5/6 w-full">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md justify-center w-2/4 mx-auto">
            <p className="font-second text-center">30 Minute Meeting</p>
            <div
              className="flex justify-center mt-3 hover:cursor-pointer hover:text-accent transition duration-200"
              onClick={handleCopyLink}
            >
              {copyLink ? (
                <>
                  <span className="my-auto">
                    <FiCheck size={"24px"} color={"#DEDFA6"} />
                  </span>
                  <p className="ml-2 text-accent">Copied Link!</p>
                </>
              ) : (
                <>
                  <span className="my-auto">
                    <FiCopy size={"24px"} />
                  </span>
                  <p className="ml-2">Copy Link</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
