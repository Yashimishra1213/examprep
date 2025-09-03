import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Myexams = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    const res = await axios.get("http://localhost:5000/api/exams/exams");
    setData(res.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        maxWidth: "90%",
        margin: "20px auto",
        padding: "20px",
        background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: "#f2eff4ff",
          fontWeight: "600",
          borderBottom: "1px solid #e7e1e1ff",
          paddingBottom: "8px",
         
        }}
      >
        My Exams
      </h3>

      <table
        className="table table-bordered text-center"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid #ddd",
          fontSize: "15px",
          backgroundColor: "#d2dbdaff",
        
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#a9c8d3ff",
              color: "white",
              fontWeight: "600",
              
            }}
          >
            <th style={{ padding: "12px" }}>S.N</th>
            <th style={{ padding: "12px" }}>Exam Name</th>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Duration</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item._id}
              style={{
                backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f1ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  i % 2 === 0 ? "#f9f9f9" : "#fff")
              }
            >
              <td style={{ padding: "10px" }}>{i + 1}</td>
              <td style={{ padding: "10px", fontWeight: "500" }}>
                {item.title}
              </td>
              <td style={{ padding: "10px" }}>{item.date}</td>
              <td style={{ padding: "10px" }}>{item.duration}</td>
              <td style={{ padding: "10px" }}>
                <Link
                  className="btn"
                  to={`/userDashboard/getexam/` + item._id}
                  style={{
                    background: "#78929aff",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#36005a")}
                  onMouseOut={(e) => (e.target.style.background = "#4b0082")}
                >
                  Start
                </Link>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: "15px", color: "#777" }}>
                No exams available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Myexams;
