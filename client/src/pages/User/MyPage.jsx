import { useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import mypageImg from "../../assets/mypage.svg";
import { useSelector } from "react-redux";
import { FiCopy, FiCheck } from "react-icons/fi";
import { AiOutlineArrowUp } from "react-icons/ai";
import useAppoinmentData from "../../hooks/useAppointmentData";
import AppointmentCollapse from "../../components/Elements/Collapse/AppointmentCollapse";
import ToastSuccess from "../../components/Elements/Toast/ToastSuccess";

const MyPage = () => {
  const user = useSelector((state) => state.user.user);
  const appointment = useSelector(
    (state) => state.listAppointment.listAppointment
  );
  const toast = useSelector((state) => state.loginToast.isLogined);

  const [isCopied, setIsCopied] = useState(false);
  const [isMtgDeleteToast, setIsMtgDeleteToast] = useState({
    success: false,
    error: false,
  });
  const [isMtgRescheduleToast, setIsMtgRescheduleToast] = useState({
    success: false,
    error: false,
  });

  useAppoinmentData();

  let bookedNum = appointment.length;

  function currentBooking() {
    if (bookedNum === 0) {
      return <p>Let's start connecting to your guests!</p>;
    } else if (bookedNum === 1) {
      return <p>You have upcoming 1 meeting!</p>;
    } else {
      return <h3>You have upcoming {bookedNum} meetings!</h3>;
    }
  }

  const BASE_URL = `${import.meta.env.VITE_DEPLOY_URL}`;
  const userId = user.userId;
  const userLink = `${BASE_URL}/${userId}/appointment/guestcalendar`;
  // const userLink = `http://localhost:5173/${userId}/appointment/guestcalendar`;

  const handleCopyLink = async () => {
    setIsCopied(true);
    return await navigator.clipboard.writeText(userLink);
  };

  return (
    <>
      <div className="md:flex md:w-93 h-[97vh]">
        <TitleWrapper>
          <h1 className="text-3xl font-second md:w-10/12 mx-auto">
            Welcome, <span>{user.username}</span>
          </h1>
          <img
            src={mypageImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-10/12 md:h-60"
          />
          <div>{currentBooking()}</div>
        </TitleWrapper>
        <div className="mt-14 md:my-auto md:w-5/6 w-full">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md justify-center w-2/4 mx-auto">
            <p className="font-second text-center text-acc">
              30 Minute Meeting
            </p>
            <p className="text-center text-sm">
              Share the link with guests to get started!
            </p>
            <div
              className="flex justify-center mt-3 hover:cursor-pointer hover:text-primary transition duration-200"
              onClick={handleCopyLink}
            >
              {isCopied ? (
                <>
                  <span className="my-auto">
                    <FiCheck size={"24px"} color={"#95B9F4"} />
                  </span>
                  <p className="ml-2 text-primary">Copied Link!</p>
                </>
              ) : (
                <>
                  <span className="animate-pulse flex">
                    <span className="my-auto">
                      <FiCopy size={"24px"} />
                    </span>
                    <p className="ml-2">Copy Link</p>
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="">
            {appointment.length === 0 ? (
              <div className="w-full mt-24">
                <p className="text-center mt-8 text-slate-500">
                  It looks like you haven't made any appointments yet.
                </p>
              </div>
            ) : (
              <div className="py-10 md:mt-12 ">
                {appointment.map((eachAppointment) => (
                  <AppointmentCollapse
                    key={eachAppointment._id}
                    eachAppointment={eachAppointment}
                    setIsMtgDeleteToast={setIsMtgDeleteToast}
                    setIsMtgRescheduleToast={setIsMtgRescheduleToast}
                    isMtgRescheduleToast={isMtgRescheduleToast}
                    isMtgDeleteToast={isMtgDeleteToast}
                  />
                ))}
              </div>
            )}
            {toast && (
              <ToastSuccess props={"Login Successfull!"} method="login" />
            )}
          </div>
        </div>
      </div>
      {isMtgDeleteToast.success && (
        <ToastSuccess
          props={"Successfully canceled!"}
          setFunction={setIsMtgDeleteToast}
          method={"mtg"}
        />
      )}
      {isMtgRescheduleToast.success && (
        <ToastSuccess
          props={"Successfully rescheduled!"}
          setFunction={setIsMtgRescheduleToast}
          method={"mtg"}
        />
      )}
    </>
  );
};

export default MyPage;
