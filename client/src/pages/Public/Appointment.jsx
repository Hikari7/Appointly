import React from "react";
import AppointmentNav from "../../components/Elements/Nav/AppointmentNav";
import Wrapper from "../../components/Elements/Wrapper/Wrapper";
import GuestCalendar from "../../../src/components/Public/GuestCalendar";
import GuestForm from "../../../src/components/Public/GuestForm";

const Appointment = () => {
  //propsでUserの情報・Appoinentの情報を子コンポーネントからもらって、ここからDBにデータを渡す

  return (
    <>
      <AppointmentNav />
      <Wrapper>
        <GuestCalendar />
        <GuestForm />
      </Wrapper>
    </>
  );
};

export default Appointment;
