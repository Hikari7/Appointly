import { useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
import mypageImg from "../../assets/mypage.svg";
import { useSelector, useDispatch } from "react-redux";
import { FiCopy, FiCheck } from "react-icons/fi";
import { AiOutlineArrowUp } from "react-icons/ai";
import useAppoinmentData from "../../hooks/useAppointmentData";
import useAvailabilityData from "../../hooks/useAvailabilityData";
import AppointmentCollapse from "../../components/Elements/Collapse/AppointmentCollapse";
import ToastSuccess from "../../components/Elements/Toast/ToastSuccess";
import RescheduleEmail from "../../components/Elements/EmailView/RescheduleEmail";

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

  useAvailabilityData();
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

  const host = {name: "Jess", email: "jess@jess.com"}
  const guest = {name: "Guest", email: "guest@guest.com"}
  const mtgInfo = {date: "Apr 20, 2023", time: "11:00"}

  return (
    <>
      {/* <RescheduleEmail host={host} guest={guest} mtgInfo={mtgInfo} /> */}
      <div className="md:flex md:w-93 h-full">
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
        <div className="mt-14 md:w-5/6 w-full">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md justify-center w-2/4 mx-auto">
            <p className="font-second text-center">30 Minute Meeting</p>
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
                  <span className="my-auto">
                    <FiCopy size={"24px"} />
                  </span>
                  <p className="ml-2">Copy Link</p>
                </>
              )}
            </div>
          </div>
          {appointment.length === 0 ? (
            <div className="w-full mt-24 animate-pulse">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiOutlineArrowUp size={32} />
              </div>
              <p className="text-center text-info mt-8">
                It seems you haven't had any appointments yet.
                <br></br>
                Share your link with your guests and get started!
              </p>
            </div>
          ) : (
            <div className="my-12 max-h-80 py-10">
              {appointment.map((eachAppointment) => (
                <AppointmentCollapse
                  key={eachAppointment._id}
                  eachAppointment={eachAppointment}
                  setIsMtgDeleteToast={setIsMtgDeleteToast}
                  setIsMtgRescheduleToast={setIsMtgRescheduleToast}
                />
              ))}
            </div>
          )}
          {toast && (
            <ToastSuccess props={"Login Successfull!"} method="login" />
          )}
        </div>
      </div>
      {isMtgDeleteToast.success && (
        <ToastSuccess
          props={"Successfully deleted!"}
          setFunction={setIsMtgDeleteToast}
          method={"mtg"}
        />
      )}
      {isMtgRescheduleToast.success && (
        <ToastSuccess
          props={"Successfully reschedule!"}
          setFunction={setIsMtgRescheduleToast}
          method={"mtg"}
        />
      )}
    </>
  );
};

export default MyPage;
