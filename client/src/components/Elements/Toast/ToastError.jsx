const ToastError = ({ props, method, setFunction }) => {
  setTimeout(() => {
    if (method === "mtg") {
      setFunction((prev) => ({ ...prev, error: false }));
    } else {
      if (setFunction) {
        setFunction(false);        
      }
    }
  }, 2000);

  return (
    <>
      <div className="toast toast-top toast-end">
        <div className="alert alert-error">
          <div>
            <span>{props}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToastError;
