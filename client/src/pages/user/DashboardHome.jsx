import React from "react";

const DashboardHome = () => {
  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
    minHeight: "100vh",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#f5f0f0ff",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  };

  const cardStyle = {
    flex: "1 1 calc(33% - 20px)",
    minWidth: "250px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    textAlign: "center",
  };

  const cardTitleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#444",
  };

  const cardTextStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  };

  const buttonStyle = (bgColor) => ({
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: bgColor,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  });

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Dashboard</h2>

      <div style={rowStyle}>
        {/* Card 1 */}
        <div style={cardStyle}>
          <h5 style={cardTitleStyle}>My Exams</h5>
          <p style={cardTextStyle}>View and manage all your upcoming exams.</p>
          <button style={buttonStyle("#076177ff")}>View Exams</button>
        </div>

        {/* Card 2 */}
        <div style={cardStyle}>
          <h5 style={cardTitleStyle}>Results</h5>
          <p style={cardTextStyle}>
            Check your latest exam results and performance.
          </p>
          <button style={buttonStyle("#146180ff")}>View Results</button>
        </div>

        {/* Card 3 */}
        {/* <div style={cardStyle}>
          <h5 style={cardTitleStyle}>Profile</h5>
          <p style={cardTextStyle}>
            Update your personal details and account settings.
          </p>
          <button style={buttonStyle("#ffc107")}>Go to Profile</button>
        </div> */}

        {/* Card 4 - Pass Count */}
        <div style={cardStyle}>
          <h5 style={cardTitleStyle}>Pass</h5>
          <p style={cardTextStyle}>
            Number of exams you have successfully cleared.
          </p>
          <button style={buttonStyle("#146180ff")}>12 Passed</button>
        </div>

        {/* Card 5 - Fail Count */}
        <div style={cardStyle}>
          <h5 style={cardTitleStyle}>Fail</h5>
          <p style={cardTextStyle}>
            Number of exams where you need to improve.
          </p>
          <button style={buttonStyle("#5e060fff")}>3 Failed</button>
        </div>

        {/* Card 6 - Dashboard Content */}
        <div style={cardStyle}>
          <h5 style={cardTitleStyle}>Dashboard Content</h5>
          <p style={cardTextStyle}>
            Overview of all your activities, exams, and progress at a glance.
          </p>
          <button style={buttonStyle("#146180ff")}>View Overview</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
