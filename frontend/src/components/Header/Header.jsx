import React from "react";
import "./Header.css";
import bellIcon from "../../assets/icons/bell-icon.svg"
import mailIcon from "../../assets/icons/mail.svg"
import dropIcon from "../../assets/icons/drop-arrow.svg"
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  const pageNameMap = {
    "/candidates": "Candidates",
    "/employees": "Employees",
    "/attendance": "Attendance",
    "/leaves": "Leaves",
  }

  const pageName = pageNameMap[path] || "Dashboard"
  return (
    <div className="header">
      <div className="top-header">
        <h2>{pageName}</h2>
        <div>
          <img alt="mail" src={mailIcon} />
          <img alt="bell-icon" src={bellIcon}/>
          <img alt="arrow" src={dropIcon}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
