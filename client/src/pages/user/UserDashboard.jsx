import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet } from "react-router";

const UserDashboard = () => {
  const styles = {
    sidebar: {
      background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
      color: "#fff",
      minHeight: "100vh",
      padding: "25px 15px",
      boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
    },
    sidebarTitle: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "30px",
      letterSpacing: "1px",
    },
    navLink: {
      color: "#f8f9fa",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "10px 15px",
      transition: "all 0.3s ease",
    },
    header: {
      padding: "15px 25px",
      background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
      color: "white",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "0 0 12px 12px",
    },
  };

  const role = localStorage.getItem("userRole");
  let email = "";

  if (role === "user") {
    email = localStorage.getItem("userEmail");
  } else {
    window.location.href = "/";
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handlelogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4 col-lg-3 d-md-block" style={styles.sidebar}>
            <h4 style={styles.sidebarTitle}>My Dashboard</h4>
            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <Link to="myexam" className="nav-link" style={styles.navLink}>
                  <i className="bi bi-journal-text me-2"></i> My Exam
                </Link>
              </li>
              <li className="nav-item">
                <Link to="myresult" className="nav-link" style={styles.navLink}>
                  <i className="bi bi-graph-up me-2"></i> My Result
                </Link>
              </li>
              <li className="nav-item">
                <Link to="message" className="nav-link" style={styles.navLink}>
                  <i className="bi bi-envelope me-2"></i> Message
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="changepassword"
                  className="nav-link"
                  style={styles.navLink}
                >
                  <i className="bi bi-key me-2"></i> Change Password
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link"
                  style={styles.navLink}
                  onClick={handlelogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-8 col-lg-9">
            {/* Header */}
            <div
              style={styles.header}
              className="d-flex justify-content-between align-items-center"
            >
              <h5 className="mb-0">{getGreeting()}</h5>
              <div>
                <i
                  className="bi bi-bell-fill me-3"
                  style={{
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    color: "yellow",
                  }}
                ></i>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Hover Fix */}
      <style>
        {`
          .nav-link:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            transform: translateX(5px);
          }
        `}
      </style>
    </>
  );
};

export default UserDashboard;
