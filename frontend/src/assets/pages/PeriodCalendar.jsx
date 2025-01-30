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

    // Helper function to compare two dates
    const isSameDay = (date1, date2) => {
        if (!date1 || !date2) return false;  // Ensure valid dates
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return !isNaN(d1) && !isNaN(d2) && d1.toDateString() === d2.toDateString();
    };

    const tileClassName = ({ date }) => {
        if (phases.menstrual.some(d => isSameDay(date, new Date(d)))) return "menstrual-day";
        if (phases.follicular.some(d => isSameDay(date, new Date(d)))) return "follicular-day";
        if (phases.ovulatory.some(d => isSameDay(date, new Date(d)))) return "ovulatory-day";
        if (phases.luteal.some(d => isSameDay(date, new Date(d)))) return "luteal-day";

        return null;
    };

    return (
        <div className="calendar">
            <Calendar onClickDay={handleDateSelection} tileClassName={tileClassName} />
        </div>
    );
};

export default PeriodCalendar;
