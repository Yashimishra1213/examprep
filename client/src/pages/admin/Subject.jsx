import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SubjectPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
    },
    heading: {
      textAlign: "center",
      color: "white",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px",
    },
    input: {
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#2b4144ff",
      padding: "8px",
      border: "1px solid transparent",
      color: "white",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "center",
    },
    editBtn: {
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      padding: "5px 8px",
      marginRight: "5px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    deleteBtn: {
      backgroundColor: "#1c4b1bff",
      color: "white",
      border: "none",
      padding: "5px 8px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    noData: {
      color: "white",
      textAlign: "center",
    },
  };

  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(`http://localhost:5000/api/Subject/${id}`, form);
        alert("Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/Subject", form);
        alert("Added Successfully");
      }
      setForm({ name: "", description: "" });
      setEdit(false);
      handleFetch();
    } catch (er) {
      alert("Subject not added");
      console.log(er);
    }
  };

  const handleFetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Subject");
      setData(res.data);
    } catch (err) {
      console.log("Error fetching Subjects", err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Subject/${id}`);
      alert("Subject Deleted Successfully");
      handleFetch();
    } catch (er) {
      alert("Sorry Try Again Later");
      console.log(er);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEdit(true);
    setId(item._id);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Subject</h2>

      <form method="post" onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="subject"
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Description"
          style={styles.input}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>
          {edit ? "Update" : "Submit"}
        </button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>S.No</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" style={styles.td}>
                Please Add a Subject
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr key={item._id}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.description}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
