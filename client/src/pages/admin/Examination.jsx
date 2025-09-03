import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examination = () => {
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [exams, setExams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectRes, sessionRes, examRes] = await Promise.all([
        axios.get('http://localhost:5000/api/subject'),
        axios.get('http://localhost:5000/api/session'),
        axios.get('http://localhost:5000/api/exams/exams'),
      ]);
      setSubjects(subjectRes.data || []);
      setSessions(sessionRes.data || []);
      setExams(examRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load subjects or sessions');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
    setError('');
  };

  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [
        ...formData.questionDistribution,
        { subject: '', numberOfQuestions: '' },
      ],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) {
      setError('At least one subject is required');
      return;
    }
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    if (
      !formData.examName ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.totalMarks ||
      !formData.passingMarks ||
      !formData.sessionId
    ) {
      return 'All fields are required';
    }
    if (parseInt(formData.passingMarks) > parseInt(formData.totalMarks)) {
      return 'Passing marks cannot exceed total marks';
    }
    if (
      formData.questionDistribution.some(
        (dist) =>
          !dist.subject ||
          !dist.numberOfQuestions ||
          parseInt(dist.numberOfQuestions) <= 0
      )
    ) {
      return 'All question distributions must have a valid subject and number of questions';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (isEditing && editingExamId) {
        await axios.put(`http://localhost:5000/api/exams/${editingExamId}`, formData);
        alert('Exam Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/exams', formData);
        alert('Exam Created Successfully');
      }

      setFormData({
        examName: '',
        date: '',
        time: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        sessionId: '',
        status: 'Scheduled',
        questionDistribution: [{ subject: '', numberOfQuestions: '' }],
      });
      setIsEditing(false);
      setEditingExamId(null);
      fetchData();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/exams/${id}`);
    if (res) {
      alert("Deleted Successfully");
      fetchData();
    } else {
      alert("Try Again Later");
    }
  };

  const handleEdit = (exam) => {
    setFormData({
      examName: exam.title,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      sessionId: exam.sessionId._id,
      status: exam.status,
      questionDistribution:
        exam.questionDistribution || [{ subject: '', numberOfQuestions: '' }],
    });
    setEditingExamId(exam._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: "10px",background:"linear-gradient(180deg, #2c3e50, #4ca1af)" }}>
      {/* Exam Form */}
      <div
        style={{
          border: "1px solid #151318ff",
          borderRadius: "6px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#e7e5ecff", marginBottom: "10px" }}>
          {isEditing ? "Edit Examination" : "Create Examination"}
        </h3>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <input
              type="text"
              name="examName"
              placeholder="Exam Name"
              value={formData.examName}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="number"
              name="totalMarks"
              placeholder="Total Marks"
              value={formData.totalMarks}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="number"
              name="passingMarks"
              placeholder="Passing Marks"
              value={formData.passingMarks}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              value={formData.duration}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>

          {/* Row 3 */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <select
              name="sessionId"
              value={formData.sessionId}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            >
              <option value="">Select Session</option>
              {sessions.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <hr />
          <h5 style={{ color: "#eae8efff" }}>Question Distribution</h5>
          {formData.questionDistribution.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <select
                name="subject"
                value={item.subject}
                onChange={(e) => handleQuestionDistChange(index, e)}
                style={{ flex: 1, padding: "8px" }}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="numberOfQuestions"
                placeholder="No. of Questions"
                value={item.numberOfQuestions}
                onChange={(e) => handleQuestionDistChange(index, e)}
                style={{ flex: 1, padding: "8px" }}
              />
              <button
                type="button"
                onClick={() => removeDistributionField(index)}
                style={{
                  background: "darkred",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addDistributionField}
            style={{
              background: "#a6b9baff",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            + Add Subject
          </button>

          <br />
          <button
            type="submit"
            style={{
              background: "#405654ff",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
            }}
          >
            {isEditing ? "Update Exam" : "Create Exam"}
          </button>
        </form>
      </div>

      {/* Exam Table */}
      <div
        style={{
          border: "1px solid #101012ff",
          borderRadius: "6px",
          padding: "15px",
          marginTop: "20px",
        }}
      >
        <h3 style={{ color: "#e9e7ecff" }}>Examination Details</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ background: "#b7c2c2ff" }}>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>S.No.</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Exam Name</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Total Marks</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Passing Marks</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Time</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Duration</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Session</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Status</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={exam._id}>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{index + 1}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.title}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.totalMarks}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.passingMarks}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.date}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.time}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.duration}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                  {exam.sessionId?.name || "N/A"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{exam.status}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                  <button
                    onClick={() => handleEdit(exam)}
                    style={{
                      background: "#0b5e71ff",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam._id)}
                    style={{
                      background: "darkred",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Examination;
