import axios from 'axios';
import React, { useState } from 'react';

const ChangePassword = () => {
  const id = localStorage.getItem('userId');
  const [form, setform] = useState({
    op: '',
    np: '',
    cnp: ''
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/examinee/change/${id}`, form);
      alert(res.data.message);
    } catch (er) {
      console.log(er);
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110vh",
   background:"linear-gradient(180deg, #2c3e50, #4ca1af)",
    fontFamily: "Arial, sans-serif"
  };

  const formStyle = {
    backgroundColor: " #bcd4d8ff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px"
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "6px",
    color: "#333"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #100f0fff",
    outline: "none",
    fontSize: "14px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#0f5768ff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px"
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#444"
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Change Password</h2>

        <div>
          <label style={labelStyle}>Old Password</label>
          <input
            type="password"
            name="op"
            onChange={handleChange}
            placeholder="Enter old password"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>New Password</label>
          <input
            type="password"
            name="np"
            onChange={handleChange}
            placeholder="Enter new password"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            name="cnp"
            onChange={handleChange}
            placeholder="Confirm new password"
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
