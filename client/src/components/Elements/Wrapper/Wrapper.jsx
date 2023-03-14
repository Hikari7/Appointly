const Wrapper = ({ children }) => {
  return (
    <div
      className=" px-6  pt-14 lg:pb-0 xl:max-w-7xl xl:mx-auto"
      style={{ minHeight: "90vh" }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
