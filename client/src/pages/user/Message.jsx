// src/components/ContactA.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';

  const fetchUserMessages = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/message/user/${userId}`);
      setMessages(res.data.message || []);
    } catch (err) {
      console.error('Error fetching user messages:', err);
    }
  };

  useEffect(() => { fetchUserMessages(); }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return alert('Enter a message');
    try {
      await axios.post('http://localhost:5000/api/message', { question, examineeId: userId });
      setQuestion('');
      fetchUserMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const editMyMessage = async (id, currentText) => {
    const newText = prompt('Edit your message:', currentText);
    if (newText === null) return;
    try {
      await axios.put(`http://localhost:5000/api/message/edit/${id}`, {
        question: newText,
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error editing message:', err);
    }
  };

  const deleteByUser = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.put(`http://localhost:5000/api/message/delete/${id}`, {
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <div style={{ padding: "20px",background:"linear-gradient(180deg, #2c3e50, #4ca1af)", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "15px", color: "#e0e2e3ff" }}>Send Feedback to Admin</h2>

      <form onSubmit={sendMessage} style={{ marginBottom: "20px"}}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "8px",
            backgroundColor: "#fbfcfcff",
            resize: "none"
          }}
          placeholder="Type your feedback..."
          rows="3"
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#063f53ff",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />
      <h3 style={{ marginBottom: "15px", color: "#f0ebebff" }}>Your Messages</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          backgroundColor: "#f5f7f7ff",
          border: "1px solid #ddd"
        }}
      >
        <thead style={{ backgroundColor: "#e9ecef" }}>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>S.No.</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Feedback</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Admin Reply</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: "12px", color: "#6c757d" }}>
                No feedback submitted
              </td>
            </tr>
          ) : (
            messages.map((msg, idx) => (
              <tr key={msg._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{idx + 1}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{msg.question}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{msg.answer || 'No reply yet'}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => editMyMessage(msg._id, msg.question)}
                    style={{
                      backgroundColor: "#2a076cff",
                      color: "#ecebebff",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteByUser(msg._id)}
                    style={{
                      backgroundColor: "#67020cff",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Message;
