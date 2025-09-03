import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboardHome = () => {
  const [data,setData] = useState([]);
  const handlefetch = async()=>{
    const res = await axios.get('http://localhost:5000/api/admindashboard/')
    setData(res.data);
  }
  useEffect(()=>{
    handlefetch()
  },[])
  console.log(data)
  return (
    <div
      style={{
        padding: "20px",
       background:"linear-gradient(180deg, #2c3e50, #4ca1af)",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#fcfdfeff",
          marginBottom: "20px",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "28px",
        }}
      >
        Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
 
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4 style={{ color: "#2a5f97", marginBottom: "10px" }}>Total Subjects</h4>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
            {data.totalSubject}
          </p>
        </div>

       
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4 style={{ color: "#2a5f97", marginBottom: "10px" }}>
            Total Examinee
          </h4>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
            {data.totalExaminees}
          </p>
        </div>

        
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4 style={{ color: "#2a5f97", marginBottom: "10px" }}>Total Exams</h4>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
            {data.totalExams}
          </p>
        </div>

       
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4 style={{ color: "#2a5f97", marginBottom: "10px" }}>
            Total Question
          </h4>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
            {data.totalQuestions}
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default AdminDashboardHome;
