import React, { useEffect, useState } from "react";
import TitleWrapper from "../../components/Elements/Wrapper/TitleWrapper";
// import UserMainWrapper from "../../components/Elements/Wrapper/UserMainWrapper";
import mypageImg from "../../assets/mypage.svg";
import { useDispatch, useSelector } from "react-redux";
import { FiCopy, FiCheck } from "react-icons/fi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import userAppointmentApi from "../../api/userAppointmentApi";
import { setAvailability } from '../../redux/slicers/availbilitySlice'
import { setListAppointment } from "../../redux/slicers/listAppointment"

//✅UserMainWrapperでコンポーネント分けると{children}が表示されなくなる

const MyPage = () => {
  const appointment = useSelector((state) => state.appointment.appointment);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  const appointmentDateTime = appointment.appointmentDateTime;
  const [isCopied, setIsCopied] = useState(false);
  const [appointmentList, setAppointmentList] = useState([])


  useEffect(() => {
    fetchAvailabilityAndListAppointment()
  }, [])
  
  const fetchAvailabilityAndListAppointment = async () => {
    try {;
      const res = await Promise.all([
        // Fetch user Availability and set the values in redux store
        userAppointmentApi.getAvailability(user.userId),
        // Fetch user Appointment and set the values in redux store
        userAppointmentApi.getAll(user.userId),
      ])
      if(res[0].data.length > 0){
        const availabilityObj = {}
        availabilityObj.weekly = res[0].data[0].weekly
        availabilityObj.daily = res[0].data[0].daily
        dispatch(setAvailability(availabilityObj))
      }else{
        // const availabilityObj = {}
        // availabilityObj.weekly = [
        //   {Sun: false, time: [{start: "", end: ""}], dow: 0},
        //   {Mon: false, time: [{start: "", end: ""}], dow: 1},
        //   {Tue: false, time: [{start: "", end: ""}], dow: 2},
        //   {Wed: false, time: [{start: "", end: ""}], dow: 3},
        //   {Thu: false, time: [{start: "", end: ""}], dow: 4},
        //   {Fri: false, time: [{start: "", end: ""}], dow: 5},
        //   {Sat: false, time: [{start: "", end: ""}], dow: 6},
        // ]
        // availabilityObj.daily = [{date: "", time: [{start: "", end: ""}]}]
        // dispatch(setAvailability(availabilityObj))
      }
      if(res[1].data.length > 0){
        const appointmentObj = res[1].data.map(e => {
          let name = e.name
          let email = e.email
          let message = e.message
          let appointmentDateTime = e.appointmentDateTime
          return {name, email, message, appointmentDateTime}
        })
        setAppointmentList(appointmentObj)
        dispatch(setListAppointment(appointmentObj))
      }else{
        dispatch(setListAppointment([]))
      }
    } catch (error) {
      console.log(error);
    }
  } 

  const userId = user.userId;
  // console.log(user.userId);

  const userLink = `http://localhost:5173/${userId}/appointment/guestcalendar`;

  const handleCopyLink = async () => {
    setIsCopied(true);

    return await navigator.clipboard.writeText(userLink);
  };

  let bookedNum = appointment.appointmentDateTime.length;

  return (
    <>
      <div className="md:flex md:w-93 ">
        <TitleWrapper>
          <h1 className="text-3xl font-second">
            Welcome, <span>{user.username}</span>
          </h1>
          <img
            src={mypageImg}
            className="w-1/3 h-1/3 mx-auto my-7 md:w-10/12 md:h-60"
          />
          <h3>You have upcoming {bookedNum} meetings!</h3>
        </TitleWrapper>
        <div className="mt-14 w-full">
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
          {appointmentList.length === 0 ? (
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
            <div className="mt-12">
              {appointmentList.map((eachAppointment) => (
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-info bg-base-100 rounded-box w-4/6 mx-auto "
                  key={uuidv4()}
                >
                  <div className="collapse-title text-xl font-medium flex w-4/6  mx-auto justify-evenly">
                    <p className="mr-3">{eachAppointment.appointmentDateTime.date}</p>
                    <p className="mr-3">{eachAppointment.appointmentDateTime.time}</p>
                  </div>
                  <div className="collapse-content">
                    {/* ✅詳細どうやって取得しよう？ */}
                    <p>Guest name: {eachAppointment.name}</p>
                    <p>Guest email: {eachAppointment.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
