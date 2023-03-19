import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";
import GuestInputForm from "./GuestInputForm";
import { useNavigate, useParams } from "react-router-dom";

const GuestForm = () => {
  const { userId } = useParams();

  //user・appointmentの情報を取り出す
  const user = useSelector((state) => state.user.user);
  const appointment = useSelector((state) => state.appointment);

  return (
    <>
      <div className="md:flex">
        <div className="md:border-r">
          <div className=" md:mt-32">
            <div className="my-3">
              {/* ✅useSelectorで取ってくる */}
              {/* <h1 className="text-3xl font-second">{user.username}</h1> */}
              <h2 className="my-3">30 Minute Meeting</h2>
            </div>
            <div className="justify-between mx-auto my-3">
              <div className="flex items-center">
                <div>
                  <h2 className="mx-1">
                    <FaRegCalendarAlt />
                  </h2>
                </div>
                <div className="mx-1">
                  {/* <h2>{appointment.date}</h2> */}
                  {/* ✅時間もいい感じに表示させる */}
                  {/* <h2>10:00 - 10:30</h2> */}
                </div>
              </div>
              <div className="flex items-center my-3 border-b md:border-b-0">
                <h2 className="mx-1 my-3">
                  <BsGlobeAmericas />
                </h2>
                <h2 className="mx-1">Pacific Time - US / Canada</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-full my-3">
          <GuestInputForm />
        </div>
      </div>
    </>
  );
};

export default GuestForm;

//ただのメモ:DBも含んだCRUD操作はこんな感じか

// useEffect(() => {
// const getUserInfo = async () => {
//   try {
//userの情報を取ってくる
//     const res = await authApi.getOne(userId);
//res.username
//   } catch (err) {
//     console.log(err);
//   }
// };
// getUserInfo();
//   useSelector;
// }, []);

// useEffect(() => {
// const getAppintmentInfo = async () => {
//   try {
//appointmentの情報を取ってくる
//     const res = await appointmentApi.getOne();
//   } catch (err) {
//     console.log(err);
//   }
// };
//   getAppintmentInfo();
// }, [appointmentID]);
