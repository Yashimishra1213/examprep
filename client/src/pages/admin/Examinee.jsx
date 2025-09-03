import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    course: '',
    branch: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

  // 🎨 Centralized inline styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
      minHeight: "100vh",
      padding: "10px"
    },
    card: {
      border: "1px solid #2c3e50",
      borderRadius: "12px",
      width: "100%",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "20px"
    },
    cardBody: {
      background: "linear-gradient(180deg, #ffffff, #f8f9fa)",
      padding: "20px"
    },
    cardBodyEdit: {
      background: "linear-gradient(180deg, #e1e8f0ff, #d9e0e1ff)",
      padding: "20px"
    },
    heading: {
      color: "#2a5f97",
      marginBottom: "15px",
      fontWeight: "bold"
    },
    form: {
      background: "#0c7981ff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      padding: "15px",
      borderRadius: "8px"
    },
    table: {
      width: "100%",
      border: "1px solid #dee2e6",
      borderRadius: "8px",
      overflow: "hidden",
      background: "#fff",
      textAlign: "center"
    },
    thead: {
      background: "linear-gradient(90deg, #2c3e50, #4ca1af)",
      color: "white"
    },
    btnPrimary: {
      background: "linear-gradient(90deg, #2c3e50, #4ca1af)",
      border: "none",
      borderRadius: "6px",
      padding: "4px 10px",
      color: "white",
      cursor: "pointer",
      marginRight: "5px"
    },
    btnDanger: {
      background: "#630d04ff",
      border: "none",
      borderRadius: "6px",
      padding: "4px 10px",
      color: "white",
      cursor: "pointer"
    },
    btnUpdate: {
      background: "#04474aff",
      border: "none",
      borderRadius: "6px",
      padding: "6px 14px",
      color: "white",
      marginRight: "5px"
    },
    btnCancel: {
      background: "#5e0e05ff",
      border: "none",
      borderRadius: "6px",
      padding: "6px 14px",
      color: "white"
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/examinee');
    setData(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/examinee/${id}`);
    alert(res ? "Deleted Successfully" : "Try Again Later");
    handlefetch();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      college: item.college,
      course: item.course,
      branch: item.branch,
      phone: item.phone,
    });
    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`http://localhost:5000/api/examinee/${editingId}`, form);
      alert('Examinee Updated Successfully');
      setForm({
        name: '',
        email: '',
        college: '',
        course: '',
        branch: '',
        phone: ''
      });
      setEditingId(null);
      setEditFormVisible(false);
      handlefetch();
    } catch (error) {
      console.error("Error updating examinee:", error);
      alert("Error updating examinee");
    }
  };

  return (
    <div style={styles.container}>
      {editFormVisible && (
        <div style={styles.card}>
          <div style={styles.cardBodyEdit}>
            <h3 style={styles.heading}>✏️ Edit Examinee</h3>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="college" value={form.college} onChange={handleChange} placeholder="Number" required />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="course" value={form.course} onChange={handleChange} placeholder="Address" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="branch" value={form.branch} onChange={handleChange} placeholder="College" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Qualification" />
                </div>
              </div>
              <button type="submit" style={styles.btnUpdate}>Update</button>
              <button type="button" onClick={() => setEditFormVisible(false)} style={styles.btnCancel}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.cardBody}>
          <h3 style={styles.heading}>📋 Examinee Details</h3>
          <table style={styles.table} className="table table-bordered">
            <thead style={styles.thead}>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Course</th>
                <th>Branch</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.college}</td>
                  <td>{item.course}</td>
                  <td>{item.branch}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} style={styles.btnPrimary}>Edit</button>
                    <button onClick={() => handleDelete(item._id)} style={styles.btnDanger}>Delete</button>
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

export default Examinee;
