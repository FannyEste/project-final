/*
import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Basic view plugin
import "@fullcalendar/daygrid/main.css"; // Default FullCalendar styles

const CycleCalendar = ({ events }) => {
  return (
    <div>
      <h2>Cycle Tracker</h2>
      <FullCalendar
        plugins={[dayGridPlugin]} // Enable day grid view
        initialView="dayGridMonth" // Default view (month view)
        events={events} // Pass events for periods and cycles
        eventColor="#ff9aa2" // Default event color
      />
    </div>
  );
};

export default CycleCalendar;
