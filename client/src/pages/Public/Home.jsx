import React from "react";
import PublicLayout from "../../components/Layout/PublicLayout";
import top from "../../assets/top.svg";
import PrimaryBtn from "../../components/Elements/Button/PrimaryBtn";

const Home = () => {
  return (
    <>
      <PublicLayout>
        <div className="container text-center">
          <h1 className="text-4xl justify-center font-second">
            Schedule online chats with ease.<br></br> Stay connected anytime,
            anywhere.
          </h1>
          <img src={top} alt="" className="w-full h-full object-cover my-7" />
          <PrimaryBtn props={"My Account"} />
        </div>
      </PublicLayout>
    </>
  );
};

export default Home;
