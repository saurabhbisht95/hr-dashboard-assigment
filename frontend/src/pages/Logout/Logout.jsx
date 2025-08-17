import React from "react";
import "./Logout.css";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <div className="logout-header">
          <h3>Log Out</h3>
        </div>
        <div className="logout-body">
          <p>Are you sure you want to log out?</p>
        </div>
        <div className="logout-footer">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
