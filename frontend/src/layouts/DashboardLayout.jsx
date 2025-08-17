import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import "./DashboardLayout.css";
import { Outlet, useOutletContext } from "react-router-dom";

export default function DashboardLayout() {

  const [topbarControls] = useOutletContext() || [{}];

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="main-content">
        <Topbar {...topbarControls} />
        <div className="page-content">
          <Outlet context={[Topbar]} /> 
        </div>
      </div>
    </div>
  );
}
