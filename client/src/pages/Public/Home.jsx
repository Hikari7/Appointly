import React from "react";
import PublicLayout from "../../components/Layout/PublicLayout";
import top from "../../assets/top.svg";
import { Link } from "react-router-dom";
// import PrimaryBtn from "../../components/Elements/Button/PrimaryBtn";

const Home = () => {
  return (
    <>
      <PublicLayout>
        <div className="container ">
          <div className="md:flex">
            <div className="w-full">
              <h1 className="text-4xl font-second md:text-5xl">
                Stay connected anytime, anywhere.
              </h1>
              <h3 className="mt-6 md:text-lg">
                This app makes scheduling online chats with ease. <br />
                Rather than spending time on scheduling, focus on connecting
                more.
              </h3>
              <Link to="/login">
                <button className="btn btn-primary normal-case  w-42 py-2 mt-8 text-xl font-second">
                  My Account
                </button>
              </Link>
            </div>
            <img
              src={top}
              alt=""
              className="w-full h-full max-h-80 min-h-full mt-8 md:m-0 md:my-auto"
            />
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Home;
