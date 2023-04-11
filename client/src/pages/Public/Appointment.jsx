import React from "react";
import AppointmentNav from "../../components/Elements/Nav/AppointmentNav";
import AppointmentWrapper from "../../components/Elements/Wrapper/AppointmentWrapper";
import { Outlet } from "react-router";

const Appointment = () => {
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
