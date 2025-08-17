import { useState, useEffect } from "react";
import "./addcandidatemodal.css";
import api from "../../utils/axios.utils";

const EditEmployeeModal = ({ isOpen, onClose, onSubmit, employeeId }) => {
  const [employee, setEmployee] = useState(null); // store fetched employee
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await api.get(`/api/v1/employees/${employeeId}`, {
            withCredentials: true,
          });
          setEmployee(response.data.data);
        } catch (error) {
          console.error("Failed to fetch employee:", error);
          alert("Failed to fetch employee details ❌");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchEmployee();
    }
  }, [isOpen, employeeId]);

  if (!isOpen || loading || !employee) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await api.post(
        `/api/v1/employees/update/${employee._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status >= 400) {
        throw new Error("Failed to update employee");
      }

      alert("Employee updated successfully ✅");
      onClose();
      if (onSubmit) onSubmit(); // refresh employee list
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee ❌");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Edit Employee</h2>
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
            <fieldset className="form-fieldset">
              <legend>Full Name*</legend>
              <input
                type="text"
                name="fullname"
                defaultValue={employee.fullname}
                required
                className="fieldset-input"
              />
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Email*</legend>
              <input
                type="email"
                name="email"
                defaultValue={employee.email}
                required
                className="fieldset-input"
              />
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Phone*</legend>
              <input
                type="tel"
                name="phone"
                defaultValue={employee.phone}
                required
                className="fieldset-input"
              />
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Position*</legend>
              <select
                name="position"
                defaultValue={employee.position} // prefill current value
                required
                className="fieldset-input"
              >
                {["Intern", "Junior", "Full-Time", "Senior", "Lead"].map(
                  (pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  )
                )}
              </select>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Department*</legend>
              <input
                type="text"
                name="department"
                defaultValue={employee.department}
                required
                className="fieldset-input"
              />
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Date of Joining*</legend>
              <input
                type="date"
                name="doj"
                defaultValue={employee.dateOfJoining?.split("T")[0]}
                required
                className="fieldset-input"
              />
            </fieldset>
          </div>

          <div className="declaration-container">
            <label>
              <input type="checkbox" required /> I declare the above information
              is true.
            </label>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
