import { useState } from "react";
import "./addcandidatemodal.css";
import uploadIcon from "../../assets/icons/upload.svg";
import api from "../../utils/axios.utils";

const AddCandidateModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);


    if (selectedFile) formData.append("resume", selectedFile);

    try {
      const response = await api.post("/api/v1/candidates/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
       window.location.reload();
      if (!response.data.success) throw new Error("Failed to save candidate");

     
      if (onSubmit) onSubmit(response.data.data);

      alert("Candidate saved successfully ✅");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save candidate ❌");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Candidate</h2>
          <button onClick={onClose} className="close-button">
            <svg className="close-icon" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Full Name */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Full Name*</legend>
              <input type="text" name="fullname" placeholder="Jane Copper" required className="fieldset-input" />
            </fieldset>

            {/* Email */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Email Address*</legend>
              <input type="email" name="email" placeholder="jane.copper@example.com" required className="fieldset-input" />
            </fieldset>

            {/* Phone */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Phone Number*</legend>
              <input type="tel" name="phone" placeholder="(704) 555-0127" required className="fieldset-input" />
            </fieldset>

            {/* Position */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Position*</legend>
              <input type="text" name="position" placeholder="Designer Intern" required className="fieldset-input" />
            </fieldset>

            {/* Experience */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Experience*</legend>
              <input type="number" name="experience" placeholder="0" min="0" required className="fieldset-input" />
            </fieldset>

            {/* Resume */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Upload Resume</legend>
              <div className="file-input-wrapper">
                <input type="file" accept=".pdf,.doc,.docx" className="fieldset-file-input" onChange={handleFileChange} />
                {!selectedFile && <img src={uploadIcon} alt="Upload" className="input-icon" />}
                {selectedFile && (
                  <div className="file-display">
                    <span className="file-name">{selectedFile.name}</span>
                    <button type="button" onClick={removeFile} className="file-remove-btn">×</button>
                  </div>
                )}
              </div>
            </fieldset>
          </div>

          <div className="declaration-container">
            <label className="declaration-label">
              <input type="checkbox" required className="declaration-checkbox" />
              <span className="declaration-text">
                I hereby declare that the above information is true to the best of my knowledge and belief
              </span>
            </label>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
