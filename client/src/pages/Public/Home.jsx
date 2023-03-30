import React from "react";
import PublicLayout from "../../components/Layout/PublicLayout";
import top from "../../assets/top.svg";
import top2 from "../../assets/top2.jpg";
import { Link } from "react-router-dom";
// import PrimaryBtn from "../../components/Elements/Button/PrimaryBtn";
import set from "../../assets/set.svg";
import niceMeeting from "../../assets/nice-meeting.svg";
import receiveInfo from "../../assets/receive-info.svg";
import AnimateInView from "../../utils/animation";

const Home = () => {
  return (
    <>
      <PublicLayout>
        <div className="container  md:mt-20">
          <AnimateInView>
            <div className="md:flex">
              <div className="w-full">
                <h1 className="text-4xl font-second font-bold md:text-5xl">
                  Stay connected anytime, anywhere.
                </h1>
                <h3 className="mt-6 md:text-lg text-info">
                  This app makes scheduling online chats with ease. <br />
                  Rather than spending time on scheduling, focus on connecting
                  more.
                </h3>
                <Link to="/login">
                  <button className="btn btn-primary normal-case  w-42 py-2 mt-8 text-xl font-second">
                    My Account
                  </button>
                </Link>
                {/* ✅デザイン考え中 */}
              </div>
              {/* <img
              src={top}
              alt=""
              className="w-full h-full max-h-80 min-h-full mt-8 md:m-0 md:my-auto"
            /> */}
              <div className="md:m-0 md:my-auto mt-8 w-full h-full drop-shadow-xl">
                <img
                  src={top2}
                  className="max-h-90 mx-auto w-full rounded-3xl rounded-tl-full rounded-br-2xl"
                />
              </div>
            </div>
          </AnimateInView>
          <div className="mt-14 md:mt-28">
            <AnimateInView>
              <h2 className="text-center font-second text-2xl">
                <span className="border-b border-thin border-neutral font-bold">
                  How to use
                </span>
              </h2>
            </AnimateInView>
            <AnimateInView>
              <div className="lg:flex mt-12 container md:max-w-full">
                <div className="card w-9/12 shadow-xl mt-8 mx-auto ">
                  <figure className="px-10 pt-10 ">
                    <img src={set} className="rounded-xl max-h-36" />
                  </figure>
                  <div className="md:flex m-7 items-center text-center min-h-16 my-auto">
                    <div className="w-3/6 mx-auto">
                      <span className="block text-6xl md:text-8xl text-primary mx-2">
                        1
                      </span>
                    </div>
                    <div>
                      <h2 className="card-title block font-second">
                        Set your schedules
                      </h2>
                      <p className="block my-2 text-info">
                        Set your availability slots on your personal page, and
                        get a unique URL to share with your guests (Your guests
                        do not need to create an account).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card w-9/12 bg-base-100 shadow-xl mt-8 mx-auto ">
                  <figure className="px-10 pt-10 ">
                    <img src={receiveInfo} className="rounded-xl max-h-36" />
                  </figure>
                  <div className="md:flex m-7 items-center text-center ">
                    <div className="w-3/6 mx-auto">
                      <span className="block text-6xl md:text-8xl text-primary mx-2">
                        2
                      </span>
                    </div>
                    <div>
                      <h2 className="card-title block font-second">Contact</h2>
                      <p className="block my-2 text-info">
                        Once your guest books a meeting, both you and your guest
                        will receive relevant details such as name, email, and
                        message.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card w-9/12 bg-base-100 shadow-xl mt-8 mx-auto">
                  <figure className="px-10 pt-10">
                    <img src={niceMeeting} className="rounded-xl max-h-36" />
                  </figure>
                  <div className="md:flex m-7 items-center text-center my-auto ">
                    <div className="w-3/6 mx-auto">
                      <span className="block text-6xl md:text-8xl text-primary mx-2">
                        3
                      </span>
                    </div>
                    <div>
                      <h2 className="card-title block font-second">
                        Have a meeting
                      </h2>
                      <p className="block my-2 text-info">
                        You can now contact the guest directly via email to set
                        the meeting details and have a nice chat at the
                        scheduled time!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateInView>
          </div>

          <AnimateInView>
            {/* <div className="my-14 md:mt-28 md:mb-28"> */}
            <div className="md:flex md:min-h-[50%] md:my-40">
              <div className="md:m-0  mt-8 w-full h-full">
                <img src={top} className="max-h-90 mx-auto w-full rounded-lg" />
              </div>
              <div className="w-full md:mx-8">
                <h2 className="text-center font-second text-2xl">
                  <span className="border-b border-thin border-neutral font-bold">
                    Q&A
                  </span>
                </h2>
                <div className="mt-5">
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                  >
                    <div className="collapse-title text-xl font-bold">
                      Q: Is this app free?
                    </div>
                    <div className="collapse-content">
                      <p>A: Yes, it is totally free.</p>
                    </div>
                  </div>
                  <div
                    tabIndex={1}
                    className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box "
                  >
                    <div className="collapse-title text-xl font-bold">
                      Q: How can the host cancel the reservation?
                    </div>
                    <div className="collapse-content">
                      <p>
                        A: To cancel a reservation, hosts can send cancel from
                        mypage??
                      </p>
                    </div>
                  </div>
                  <div
                    tabIndex={2}
                    className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box "
                  >
                    <div className="collapse-title text-xl font-bold">
                      Q: How can the guest cancel the reservation?
                    </div>
                    <div className="collapse-content">
                      <p>
                        A: To cancel a reservation, guests can directly contact
                        the host via email. The host's email information is
                        provided to guests once the booking is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </AnimateInView>
        </div>
      </PublicLayout>
    </>
  );
};

export default Home;
