const Wrapper = ({ children }) => {
  return (
    <div
      className="pt-14 mx-auto w-10/12 sm:container justify-cente"
      style={{ minHeight: "90vh" }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
