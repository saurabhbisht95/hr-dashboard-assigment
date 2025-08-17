import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Candidates from "./pages/Candidates/Candidates";
import Employees from "./pages/Employees/Employee";
import Attendance from "./pages/Attendance/Attendance";
import Leave from "./pages/Leave/Leave";
import AuthPage from "./pages/Auth/AuthPage";
import { useAuth } from "./context/AuthContext"; 

import "./App.css";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; 

  return user ? children : <Navigate to="/" />;
};

// Logout component
const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); 
    navigate("/"); 
  }, [logout, navigate]);

  return null; 
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
    
        <Route path="/" element={user ? <Navigate to="/candidates" /> : <AuthPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Header />
                  <div className="page-content">
                    <Routes>
                      <Route path="/" element={<Navigate to="/candidates" />} />
                      <Route path="/candidates" element={<Candidates />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/attendance" element={<Attendance />} />
                      <Route path="/leaves" element={<Leave />} />
                      <Route path="/logout" element={<Logout />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
