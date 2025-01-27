import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PeriodCalendar = ({ phases }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log("valt datum: ", date);
  };

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

    // Default case: no class for this date
    return null;
  };

  return (
    <div className="calendar">
      <h2>Cycle Tracker</h2>
      {/* Pass the handleDateSelection to the Calendar's onChange prop */}
      <Calendar onChange={handleDateSelection} tileClassName={tileClassName} />
    </div>
  );
};

export default PeriodCalendar;
