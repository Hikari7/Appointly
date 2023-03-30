const HomeWrapper = ({ children }) => {
  return (
    <div
      className="py-14 mx-auto w-5/6 container justify-center md:w-4/5"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-full bg-white">{children}</div>
    </div>
  );
};

export default HomeWrapper;
