import React from "react";
import PublicLayout from "../../components/Layout/PublicLayout";
import top from "../../assets/top.svg";
import { Link } from "react-router-dom";
// import PrimaryBtn from "../../components/Elements/Button/PrimaryBtn";
import set from "../../assets/set.svg";
import niceMeeting from "../../assets/nice-meeting.svg";
import receiveInfo from "../../assets/receive-info.svg";

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
          <div className="my-8 md:my-20">
            <h2 className="text-center font-second text-xl">
              <span className="border-b border-thin border-neutral">
                How to use
              </span>
            </h2>
            <div className="container md:flex">
              <div className="card w-80 bg-base-100 shadow-xl mt-5 mx-auto  ">
                <figure className="px-10 pt-10">
                  <img src={set} className="rounded-xl" />
                </figure>
                <div className="blcok flex m-7 items-center text-center card-body ">
                  <div className="w-3/6">
                    <span className="block text-8xl">1</span>
                  </div>
                  <div>
                    <h2 className="card-title block font-second">
                      Set your schedules
                    </h2>
                    <p className="block">
                      You can set a schedule for online chat meetings with a
                      time table every 30 minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card w-80 bg-base-100 shadow-xl mt-5 mx-auto ">
                <figure className="px-10 pt-10">
                  <img src={receiveInfo} className="rounded-xl" />
                </figure>
                <div className="blcok flex m-7 items-center text-center card-body ">
                  <div className="w-3/6">
                    <span className="block text-8xl">2</span>
                  </div>
                  <div>
                    <h2 className="card-title block font-second">
                     Contact
                    </h2>
                    <p className="block">
                      You can set a schedule for online chat meetings with a
                      time table every 30 minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card w-80 bg-base-100 shadow-xl mt-5 mx-auto ">
                <figure className="px-10 pt-10">
                  <img src={niceMeeting} className="rounded-xl" />
                </figure>
                <div className="blcok flex m-7 items-center text-center card-body ">
                  <div className="w-3/6">
                    <span className="block text-8xl">3</span>
                  </div>
                  <div>
                    <h2 className="card-title block font-second">
                      Set your schedules
                    </h2>
                    <p className="block">
                      There you go! You can now have a nice chat with the guest
                      at the scheduled time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Home;
