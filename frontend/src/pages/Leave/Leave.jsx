import React, { useEffect, useState, useMemo } from "react";
import "./Leave.css";
import LeaveHeader from "./LeaveHeader";
import api from "../../utils/axios.utils";
import docIcon from "../../assets/icons/docs.svg";
import LeaveCalendar from "./LeaveCalendar";

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = ["pending", "approved", "rejected"];

  // Fetch leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get("/api/v1/leave"); t
        console.log(response);
        setLeaves(response.data.data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  // Update leave status
  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      await api.put(`/api/v1/leave/update/${leaveId}`, { status: newStatus });
      setLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Filter + search
  const filteredLeaves = useMemo(() => {
    return leaves.filter((l) => {
      const matchesStatus = filters.status ? l.status === filters.status : true;
      const matchesSearch =
        l.employee?.fullname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        l.employee?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [leaves, filters, searchTerm]);

  return (
    <>
      <LeaveHeader
        filters={filters}
        setFilters={setFilters}
        onSearch={setSearchTerm}
      />

      <div className="leave-parent">
        <div className="leaves">
          <table className="data-table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Employee Name</th>
                <th>Leave Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Docs</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="loading">
                    Loading leaves...
                  </td>
                </tr>
              ) : filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave, index) => (
                  <tr key={leave._id}>
                    <td>{index + 1}</td>
                    <td>{leave.employee?.fullname}</td>
                    <td>{new Date(leave.leaveDate).toLocaleDateString()}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <select
                        value={leave.status}
                        onChange={(e) =>
                          handleStatusChange(leave._id, e.target.value)
                        }
                        style={{
                          color:
                            leave.status === "approved"
                              ? "#008413"
                              : leave.status === "rejected"
                              ? "#B70000"
                              : "#FF8C00",
                        }}
                        className="dropdown"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {leave.document ? (
                        <a
                          href={`http://localhost:8000${leave.document}`}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={docIcon}
                            alt="Download Document"
                            style={{ cursor: "pointer" }}
                          />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No leaves found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <LeaveCalendar leaves={leaves} />
      </div>
    </>
  );
}

export default Leave;
