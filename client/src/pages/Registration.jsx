import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    session: "",
    college: "",
    phone: "",
    course: "",
    branch: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/examinee", form);
      alert("Registered Successfully");
      window.location.href = "/";
    } catch (er) {
      console.log(er);
      alert("Sorry Try again later");
    }
  };

  const [data, setData] = useState([]);
  const handlefetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session");
      setData(res.data);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?semt=ais_hybrid&w=740&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(66,108,144,0.85)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#ffffff",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Registration Form
        </h2>

        <form method="POST" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              className="form-control"
              placeholder="Phone Number"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* College */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              College Name
            </label>
            <input
              type="text"
              name="college"
              onChange={handleChange}
              className="form-control"
              placeholder="College Name"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Session */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Session
            </label>
            <select
              name="session"
              onChange={handleChange}
              className="form-select"
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Session</option>
              {data.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Course
            </label>
            <input
              type="text"
              name="course"
              onChange={handleChange}
              className="form-control"
              placeholder="Course"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Branch */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#f1f4f7ff" }}>
              Branch
            </label>
            <input
              type="text"
              name="branch"
              onChange={handleChange}
              className="form-control"
              placeholder="Branch"
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button
              type="submit"
              name="submit"
              className="btn"
              style={{
                padding: "12px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg,#2c5364,#203a43,#0f2027)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg,#0f2027,#203a43,#2c5364)")
              }
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

