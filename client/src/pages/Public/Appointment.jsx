import React from "react";
import AppointmentNav from "../../components/Elements/Nav/AppointmentNav";
import AppointmentWrapper from "../../components/Elements/Wrapper/AppointmentWrapper";
import GuestCalendar from "../../../src/components/Public/GuestCalendar";
import GuestForm from "../../../src/components/Public/GuestForm";
import { Outlet } from "react-router";

const Appointment = () => {
  //propsでUserの情報・Appoinentの情報を子コンポーネントからもらって、ここからDBにデータを渡す

  return (
    <>
      <AppointmentNav />
      <AppointmentWrapper>
        <Outlet />
      </AppointmentWrapper>
    </>
  );
};

export default Appointment;
