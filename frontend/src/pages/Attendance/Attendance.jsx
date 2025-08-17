import React, { useEffect, useState, useMemo } from "react";
import "./Attendance.css";
import AttendanceHeader from "./AttendanceHeader";
import api from "../../utils/axios.utils";
import moreIcon from "../../assets/icons/more.svg";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", position: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get(`/api/v1/attendance`);
      setAttendance(response.data.data || []);
    } catch (error) {
      console.error("Error fetching Attendance:", error);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = useMemo(() => {
    return (attendance || []).filter((item) => {
      const matchesStatus = filters.status
        ? item.status === filters.status
        : true;
      const matchesPosition = filters.position
        ? item.position === filters.position
        : true;
      const matchesSearch =
        item.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPosition && matchesSearch;
    });
  }, [attendance, filters, searchTerm]);

  const handleStatusChange = async (employeeId, newStatus) => {
    try {
      await api.put(`/api/v1/attendance/${employeeId}`, { status: newStatus });
      setAttendance((prev) =>
        prev.map((item) =>
          item._id === employeeId ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <>
      <AttendanceHeader
        filters={filters}
        setFilters={setFilters}
        onSearch={setSearchTerm}
        onAddAttendance={fetchAttendance}
      />

      <div className="attendance-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="loading">
                  Loading Attendance...
                </td>
              </tr>
            ) : filteredAttendance.length > 0 ? (
              filteredAttendance.map((item, index) => (
                <tr key={index}>
                  <td></td>
                  <td>{item.fullname}</td>
                  <td>{item.position}</td>
                  <td>{item.department}</td>
                  <td>{item.task || "-"}</td>
                  <td>
                    <select
                      value={item.status || "Present"}
                      className={`dropdown ${
                        item.status === "Present"
                          ? "status-present"
                          : "status-absent"
                      }`}
                      style={{
                        color:
                          item.status === "Present" ? "#008413" : "#B70000",
                      }}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>
                    <img src={moreIcon} alt="More" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No Attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Attendance;
