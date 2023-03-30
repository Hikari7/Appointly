import React from "react";
import DesktopNav from "../Elements/Nav/DesktopNav";
import MobileNav from "../Elements/Nav/MobileNav";
import HomeWrapper from "../Elements/Wrapper/HomeWrapper";
import Footer from "../Elements/Footer/Footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <HomeWrapper>{children}</HomeWrapper>
      <Footer />
    </>
  );
};

export default PublicLayout;
