import React, { useEffect, useState, useMemo } from "react";
import "./Employee.css";
import EmployeeHeader from "./EmployeeHeader";
import EditEmployeeModal from "../../components/modal/EditEmployeeModal";
import api from "../../utils/axios.utils";
import moreIcon from "../../assets/icons/more.svg";

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", position: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/api/v1/employees`);
      if (!response.data) throw new Error("Failed to fetch Employee");
      setEmployee(response.data.data);
    } catch (error) {
      console.error("Error fetching Employee:", error);
      setEmployee([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployee = useMemo(() => {
    return (employee || []).filter((c) => {
      const matchesStatus = filters.status ? c.status === filters.status : true;
      const matchesPosition = filters.position ? c.position === filters.position : true;
      const matchesSearch =
        c.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPosition && matchesSearch;
    });
  }, [employee, filters, searchTerm]);

  const handleAddEmployee = async () => {
    await fetchEmployee();
  };

  const handleDeleteEmployee = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/api/v1/employees/${_id}`);
      setEmployee((prev) => prev.filter((emp) => emp._id !== _id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleEditEmployee = (empId) => {
    setSelectedEmployeeId(empId);
    setIsModalOpen(true);
  };

  return (
    <>
      <EmployeeHeader
        filters={filters}
        setFilters={setFilters}
        onSearch={setSearchTerm}
        onAddEmployee={handleAddEmployee}
      />

      <div className="candidates">
        <table className="data-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading">Loading Employee...</td>
              </tr>
            ) : filteredEmployee.length > 0 ? (
              filteredEmployee.map((emp, index) => (
                <tr key={emp._id || index}>
                  <td>{index + 1}</td>
                  <td>{emp.fullname}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>
                    {emp.dateOfJoining
                      ? new Date(emp.dateOfJoining).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <div className="more-menu-container" style={{ position: "relative" }}>
                      <img
                        src={moreIcon}
                        alt="more"
                        className="more-icon"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const menu = e.currentTarget.nextSibling;
                          menu.style.display =
                            menu.style.display === "block" ? "none" : "block";
                        }}
                      />
                      <div
                        className="more-menu"
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          background: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          borderRadius: "6px",
                          zIndex: 10,
                          minWidth: "120px",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            handleEditEmployee(emp._id);
                            e.target.parentElement.style.display = "none";
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            handleDeleteEmployee(emp._id);
                            e.target.parentElement.style.display = "none";
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">No Employee found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedEmployeeId && (
        <EditEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEmployee}
          employeeId={selectedEmployeeId}
        />
      )}
    </>
  );
}

export default Employee;
