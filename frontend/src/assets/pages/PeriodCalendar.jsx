// PeriodCalendar.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PeriodCalendar = ({ phases, onStartDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        onStartDateSelect(date);
    };

    const tileClassName = ({ date }) => {
        const isSameDay = (date1, date2) =>
            date1.toDateString() === date2.toDateString();

        if (phases.menstrual.some(d => isSameDay(date, d))) return "menstrual-day";
        if (phases.follicular.some(d => isSameDay(date, d))) return "follicular-day";
        if (phases.ovulatory.some(d => isSameDay(date, d))) return "ovulatory-day";
        if (phases.luteal.some(d => isSameDay(date, d))) return "luteal-day";

        return null;
    };

    return (
        <div className="calendar">
            <Calendar onClickDay={handleDateSelection} tileClassName={tileClassName} />
        </div>
    );
};

export default PeriodCalendar;
