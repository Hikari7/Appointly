import BaseCalendar from "./BaseCalendar";
import { BsGlobeAmericas } from "react-icons/bs";

const Calendar = () => {
  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="mx-1 text-center my-auto">
          <BsGlobeAmericas />
        </div>
        <p className="mx-1 items-center justify-center">
          Pacific Time - US / Canada
        </p>
      </div>
      <BaseCalendar />
    </>
  );
};

export default Calendar;
