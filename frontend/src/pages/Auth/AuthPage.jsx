import React, { useState } from "react";
import "./index.css";
import Logo from "../../assets/images/Logo.svg";
import Common from "./Common";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import eyeOpenIcon from "../../assets/icons/eye-open.svg";
import eyeCloseIcon from "../../assets/icons/eye-close.svg";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login, api } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isRegister) {
        const res = await api.post("/api/v1/users/register", {
          fullname: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        setMessage(res.data.message || "Registered successfully!");
        setIsRegister(false); 
      } else {
       
        await login(formData.email, formData.password); 
        setMessage("Login successful!");
        navigate("/dashboard"); 
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <img className="register-logo" src={Logo} alt="logo" width={100} height={40} />

      <div className="register-container">
        <Common />

        <div className="register-right">
          <h4 className="register-title">Welcome to Dashboard</h4>

          <form className="register-form" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="name">
                  Full Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">
                Email Address<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password<span className="required">*</span>
              </label>
              <div className="rela">
                <img
                  src={showPassword ? eyeOpenIcon : eyeCloseIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                />
                <input
                  className="w-full"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password<span className="required">*</span>
                </label>
                <div className="rela">
                  <img
                    src={showConfirmPassword ? eyeOpenIcon : eyeCloseIcon}
                    alt={showConfirmPassword ? "Hide password" : "Show password"}
                    className="eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                  <input
                    className="w-full"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {!isRegister && <p className="forgot-password">Forgot password?</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading
                ? isRegister
                  ? "Registering..."
                  : "Logging in..."
                : isRegister
                ? "Register"
                : "Login"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <p className="register-link">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button type="button" className="text-purple-600 underline" onClick={() => setIsRegister(false)}>
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button type="button" className="text-purple-600 underline" onClick={() => setIsRegister(true)}>
                  Register
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
