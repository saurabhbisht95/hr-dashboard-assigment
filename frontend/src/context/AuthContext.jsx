import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";


const AuthContext = createContext({});


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  
  const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, 
  });

  

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/v1/users/login", { email, password });
      setUser(response.data.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  const logout = async () => {
  try {
    await api.post("/api/v1/users/logout");
    setUser(null);
    window.location.href = "/"; 
  } catch (error) {
    console.error("Logout failed", error);
  }
};


 
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get("/api/v1/users/auth");
        setUser(response.data.data.user || null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

 
  const value = {
    user,
    setUser,
    login,
    logout,
    loading,
    api, 
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
