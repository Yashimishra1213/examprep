import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportGeneration = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/exams/report');
    console.log(res.data);
    setData(Array.isArray(res.data) ? res.data : [res.data]);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(180deg, #2c3e50, #4ca1af); }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; background: #fff; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #b9c2c3ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${item.attemptedAt}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={outerContainer}>
      <div style={innerContainer}>
        <div style={cardStyle}>
          <h3 style={headingStyle}>Report Generation</h3>
          
          <table style={tableStyle}>
            <thead>
              <tr style={headerRowStyle}>
                <th style={thStyle}>S.N</th>
                <th style={thStyle}>Exam Name</th>
                <th style={thStyle}>Examinee Name</th>
                <th style={thStyle}>Total Marks</th>
                <th style={thStyle}>Score</th>
                <th style={thStyle}>Passing Marks</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr 
                  key={item._id} 
                  style={{ ...rowStyle, backgroundColor: i % 2 === 0 ? "#fafafa" : "#fff" }}
                >
                  <td style={tdStyle}>{i + 1}</td>
                  <td style={tdStyle}>{item.examTitle}</td>
                  <td style={tdStyle}>{item.examineeName}</td>
                  <td style={tdStyle}>{item.totalMarks}</td>
                  <td style={tdStyle}>{item.score}</td>
                  <td style={tdStyle}>{item.passingMarks}</td>
                  <td style={tdStyle}>{item.status}</td>
                  <td style={tdStyle}>{new Date(item.attemptedAt).toLocaleString()}</td>
                  <td style={tdStyle}>
                    <button 
                      style={buttonStyle}
                      onClick={() => handlePrint(item)}
                    >
                      Generate Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

// ✅ Inline CSS Styles (Reusable objects)

const outerContainer = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
  minHeight: "100vh"
};

const innerContainer = {
  margin: "20px auto",
  maxWidth: "1200px"
};

const cardStyle = {
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  padding: "20px"
};

const headingStyle = {
  color: "#0b6279ff",
  fontWeight: "bold",
  marginBottom: "20px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const headerRowStyle = {
  backgroundColor: "#5a7277ff"
};

const rowStyle = {
  borderBottom: "1px solid #ddd"
};

const thStyle = {
  padding: "10px",
  border: "1px solid #0a0415ff",
  textAlign: "left",
  fontWeight: "bold",
  color: "#f1f5f7ff"
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #18161cff",
  textAlign: "left"
};

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#4295c1ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px"
};

export default ReportGeneration;
