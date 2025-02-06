import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PeriodCalendar = ({ phases, onStartDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        onStartDateSelect(date);
    };

    const isSameDay = (date1, date2) => {
        if (!date1 || !date2) return false;
        return new Date(date1).toDateString() === new Date(date2).toDateString();
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
            <Calendar
                onClickDay={handleDateSelection}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default PeriodCalendar;