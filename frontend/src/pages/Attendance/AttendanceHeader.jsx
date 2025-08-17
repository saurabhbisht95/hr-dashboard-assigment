import React from 'react';

const AttendanceHeader = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="bottom-header">
      <div className="left-bottom-header">
       
        <select
          className="dropdown"
          value={filters.position}
          onChange={(e) => setFilters({ ...filters, position: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <div className="right-bottom-header">
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AttendanceHeader;
