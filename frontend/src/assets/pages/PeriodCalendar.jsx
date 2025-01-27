import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PeriodCalendar = ({ phases }) => {
  const tileClassName = ({ date }) => {
    const isSameDay = (date1, date2) =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();

    // Safely check if each phase exists and is an array
    if (phases.menstrual?.some((d) => isSameDay(date, d))) return "menstrual-day";
    if (phases.follicular?.some((d) => isSameDay(date, d))) return "follicular-day";
    if (phases.ovulatory?.some((d) => isSameDay(date, d))) return "ovulatory-day";
    if (phases.luteal?.some((d) => isSameDay(date, d))) return "luteal-day";

    return null;
  };

  return (
    <div className="calendar">
      <h2>Cycle Tracker</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default PeriodCalendar;
