const AppointmentWrapper = ({ children }) => {
  return (
    <div
      className="py-14 mx-auto w-9/12 container justify-center md:w-4/5"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AppointmentWrapper;
