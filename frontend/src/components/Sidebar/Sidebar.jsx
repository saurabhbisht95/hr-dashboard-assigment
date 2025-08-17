import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "../../pages/Logout/Logout";
import "./Sidebar.css";

import candidateIcon from "../../assets/icons/candidate.svg";
import employeeIcon from "../../assets/icons/employees.svg";
import attendanceIcon from "../../assets/icons/attendance.svg";
import leaveIcon from "../../assets/icons/leave.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import logoIcon from "../../assets/images/Logo.svg";
import searchIcon from "../../assets/icons/search.svg";

function Sidebar() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    setIsLogoutOpen(true); // open modal
  };

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    logout(); // actually log out
    // navigate to login page if needed
    window.location.href = "/"; // simple redirect
  };

  const handleCancelLogout = () => {
    setIsLogoutOpen(false); // close modal
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <img src={logoIcon} alt="Logo" className="logo" />
      </div>

      {/* Search */}
      <div className="search-box">
        <img src={searchIcon} alt="search" className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>

      {/* Recruitment Section */}
      <p className="section-title">Recruitment</p>
      <NavLink
        to="/candidates"
        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
      >
        <img src={candidateIcon} alt="Candidates" />
        <span>Candidates</span>
      </NavLink>

      {/* Organization Section */}
      <p className="section-title">Organization</p>
      <NavLink
        to="/employees"
        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
      >
        <img src={employeeIcon} alt="Employees" />
        <span>Employees</span>
      </NavLink>

      <NavLink
        to="/attendance"
        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
      >
        <img src={attendanceIcon} alt="Attendance" />
        <span>Attendance</span>
      </NavLink>

      <NavLink
        to="/leaves"
        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
      >
        <img src={leaveIcon} alt="Leaves" />
        <span>Leaves</span>
      </NavLink>

      {/* Others Section */}
      <p className="section-title">Others</p>
      {/* Logout menu item triggers modal */}
      <div
        className="menu-item"
        onClick={handleLogoutClick}
        style={{ cursor: "pointer" }}
      >
        <img src={logoutIcon} alt="Logout" />
        <span>Logout</span>
      </div>

      {/* Logout Modal */}
      {isLogoutOpen && (
        <LogoutModal
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
}

export default Sidebar;
