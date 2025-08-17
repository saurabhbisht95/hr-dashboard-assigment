import { useState, useEffect } from "react";
import "./addcandidatemodal.css";
import api from "../../utils/axios.utils";
import uploadIcon from "../../assets/icons/upload.svg";

const AddLeaveModal = ({ isOpen, onClose, onSubmit }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

  // Fetch all employees for search
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/api/v1/employees");
        setEmployees(res.data.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedEmployee || !leaveDate || !reason) {
    alert("Please fill all required fields!");
    return;
  }

  const formData = new FormData();
  formData.append("leaveDate", leaveDate);
  formData.append("reason", reason);
  if (selectedFile) formData.append("document", selectedFile);

  try {
    const response = await api.post(`/api/v1/leave/add/${selectedEmployee._id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // important
      },
    });

    if (!response.data.success) throw new Error("Failed to add leave");

    alert("Leave added successfully ✅");

    // Pass the new leave to parent for live update
    if (onSubmit) onSubmit(response.data.data);

    onClose();
  } catch (err) {
    console.error("Error adding leave:", err);
    alert("Failed to add leave ❌");
  }
};


  const handleEmployeeSelect = (emp) => {
    setSelectedEmployee(emp);
    setSearchTerm(emp.fullname);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Filter employees for search
  const filteredEmployees = employees.filter((emp) =>
    emp.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add Leave</h2>
          <button onClick={onClose} className="close-button">
            <svg className="close-icon" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Employee Name */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Employee Name*</legend>
              <input
                type="text"
                placeholder="Search Employee"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedEmployee(null);
                }}
                required
                className="fieldset-input"
              />
              {searchTerm && !selectedEmployee && (
                <ul className="search-results">
                  {filteredEmployees.map((emp) => (
                    <li
                      key={emp._id}
                      className="search-result-item"
                      onClick={() => handleEmployeeSelect(emp)}
                    >
                      {emp.fullname}
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>

            {/* Designation */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Designation*</legend>
              <input
                type="text"
                value={selectedEmployee?.position || ""}
                placeholder="Designation"
                readOnly
                required
                className="fieldset-input"
              />
            </fieldset>

            {/* Leave Date */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Leave Date*</legend>
              <input
                type="date"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                required
                className="fieldset-input"
              />
            </fieldset>
            
            {/* Document */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Leave Document</legend>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="fieldset-file-input"
                  onChange={handleFileChange}
                />
                {!selectedFile && (
                  <img src={uploadIcon} alt="Upload" className="input-icon" />
                )}
                {selectedFile && (
                  <div className="file-display">
                    <span className="file-name">{selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="file-remove-btn"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Reason */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Reason*</legend>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for leave"
                required
                className="fieldset-input"
              />
            </fieldset>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveModal;
