import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

function AdminDashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const adminName = localStorage.getItem("adminName") || "Admin";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(" Good Morning");
    else if (hour < 18) setGreeting(" Good Afternoon");
    else setGreeting(" Good Evening");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/adlogin");
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "240px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
          background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
        }}
      >
        <h4
          className="text-center mb-4"
          style={{ fontWeight: "bold", letterSpacing: "1px" }}
        >
          ⚡ Admin
        </h4>

       

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              to="/addash/session"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Session
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/addash/subject"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Subject
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/addash/examinee"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Examinee
            </Link>
          </li>
            <li className="nav-item mb-2">
            <Link
              to="/addash/question"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Question Bank
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/addash/examination"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Examination
            </Link>
          </li>

        

          <li className="nav-item mb-2">
            <Link
              to="/addash/reportgeneration"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Report Generation
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/addash/changepassword"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Change Password
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/addash/messagereply"
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "0.3s",
              }}
            >
              Message Reply
            </Link>
          </li>

          <li className="nav-item mb-2">
            <button
              onClick={handleLogout}
              className="btn btn "
              style={{ borderRadius: "1px",color:"white",fontSize:"800"}}
            >
               Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {/* Header */}
        <nav
          className="navbar navbar-light bg-white shadow-sm px-4"
          style={{
            height:"65px",
            borderBottom: "1px solid #ddd",
            background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
          }}
        >
          <h5
            className="mb-0"
            style={{ fontWeight: "bold", color: "white" }}
          >
            📊 Admin Dashboard
          </h5>
         <div className="text-center mb-0">
          <h5 style={{ margin: 0, fontWeight: "bold",color:"white" }}>{greeting}</h5>
          
        </div>
           
        </nav>

        {/* Content */}
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 