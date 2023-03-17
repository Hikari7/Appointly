const Wrapper = ({ children }) => {
  return (
    <div
      className="pt-14 mx-auto w-9/12 md:container justify-center md:w-4/5"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">{children}</div>
    </div>
  );
};

export default Wrapper;
