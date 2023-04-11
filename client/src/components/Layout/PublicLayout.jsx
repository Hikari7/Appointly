import React from "react";
import DesktopNav from "../Elements/Nav/DesktopNav";
import HomeWrapper from "../Elements/Wrapper/HomeWrapper";
import Footer from "../Elements/Footer/Footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <div>
        <DesktopNav />
      </div>
      <HomeWrapper>{children}</HomeWrapper>
      <Footer />
    </>
  );
};

export default PublicLayout;
