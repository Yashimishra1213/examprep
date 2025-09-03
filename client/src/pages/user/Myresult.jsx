import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Result = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('userId');

  const handlefetch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/exams/examinee-result/${userId}`
      );
      console.log("Fetched Results:", res.data.message);

      setData(res.data.message || []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setData([]);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // ✅ Print function (with console log)
  const handlePrint = () => {
    console.log("🖨️ Printing Results:", data);
    window.print();
  };

  return (
    <div style={{ padding: "20px", background: "linear-gradient(180deg, #2c3e50, #4ca1af)" }}>
      <div className="row mt-1" style={{ margin: 0 }}>
        <div className="col-sm-12" style={{ padding: 0 }}>
          <div
            className="card mx-auto mt-2"
            style={{
              border: "1px solid #0e0e0eff",
              width: "100%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff"
            }}
          >
            <div className="card-body" style={{ padding: "20px" }}>
              <div className="container p-0" style={{ width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h3
                    className="fw-bold"
                    style={{ color: " #2a5f97ff", marginBottom: "20px" }}
                  >
                    Examinee Result
                  </h3>

                  {/* ✅ Print Button */}
                  <button
                    onClick={handlePrint}
                    className="btn btn-sm btn-primary"
                    style={{backgroundColor:"#2a5f97ff"}}
                  >
                    <i className="bi bi-printer me-1"></i> Print
                  </button>
                </div>

                <table
                  className="table table-bordered text-center"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead
                    className="table-secondary"
                    style={{ backgroundColor: "#e9ecef" }}
                  >
                    <tr>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>S.N</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Exam name</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Your Name</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Total Marks</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Score</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Passing Marks</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Status</td>
                      <td style={{ fontWeight: "bold", padding: "10px" }}>Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter(Boolean).map((item, i) => (
                      <tr key={item?._id || i}>
                        <td style={{ padding: "8px" }}>{i + 1}</td>
                        <td style={{ padding: "8px" }}>{item?.examId?.title || "Exam Deleted"}</td>
                        <td style={{ padding: "8px" }}>{item?.examineeId?.name || "Unknown"}</td>
                        <td style={{ padding: "8px" }}>{item?.totalMarks ?? "N/A"}</td>
                        <td style={{ padding: "8px" }}>{item?.score ?? "N/A"}</td>
                        <td style={{ padding: "8px" }}>{item?.passingMarks ?? "N/A"}</td>
                        <td
                          style={{
                            padding: "8px",
                            color:
                              item?.status === "Pass"
                                ? "green"
                                : item?.status === "Fail"
                                ? "red"
                                : "black",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.status ?? "N/A"}
                        </td>
                        <td style={{ padding: "8px" }}>
                          {item?.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                    {data.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ padding: "12px", color: "#6c757d" }}>
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
