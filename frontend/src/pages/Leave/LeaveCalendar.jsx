
import React, { useState } from "react";
import "./Leave.css";

const LeaveCalendar = ({ leaves = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(i);
  }

  const changeMonth = (increment) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1
      )
    );
    setSelectedDay(null);
  };

  const getLeavesForDay = (day) => {
    return leaves.filter((l) => {
      const leaveDate = new Date(l.leaveDate);
      return (
        leaveDate.getDate() === day &&
        leaveDate.getMonth() === currentMonth.getMonth() &&
        leaveDate.getFullYear() === currentMonth.getFullYear() &&
        l.status === "approved"
      );
    });
  };

  return (
    <div className="calendar-container-ui">
      <div className="calendar-header-ui">
        <span>Leave Calendar</span>
      </div>

      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="calendar-grid-ui">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="calendar-day-name-ui">{d}</div>
        ))}

        {daysInMonth.map((day) => {
          const leavesForDay = getLeavesForDay(day);
          const hasLeave = leavesForDay.length > 0;
          const isSelected = selectedDay === day;

          return (
            <div
              key={day}
              className={`calendar-day-ui ${hasLeave ? "leave-day-ui" : ""} ${
                isSelected ? "selected-day-ui" : ""
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
              {hasLeave && (
                <span
                  className="leave-dot-ui"
                  title={`${leavesForDay.length} approved leave(s)`}
                >
                  {leavesForDay.length}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="calendar-footer-ui">
        <strong>Approved Leaves</strong>
        <ul>
          {selectedDay &&
            getLeavesForDay(selectedDay).map((l) => (
              <li key={l._id}>
                <div className="employee-name-date">
                  {l.employee?.fullname} -{" "}
                  {new Date(l.leaveDate).toLocaleDateString()}
                </div>
                <div className="employee-position">{l.employee?.position}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaveCalendar;
