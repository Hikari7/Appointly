const WrapperHome = ({ children }) => {
  return (
    <div
      className="py-14 mx-auto w-5/6 md:container justify-center md:w-4/5"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-full  bg-white">{children}</div>
    </div>
  );
};

export default WrapperHome;
