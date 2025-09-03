import React,{useState,useEffect} from 'react'
import axios from 'axios';

const MessageReply = () => {
  const [messages, setMessages] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});

  const fetchAll = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/message/all');
      setMessages(res.data.message || []);
    } catch (err) {
      console.error('Error fetching messages for admin:', err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (id) => {
    const answer = (replyInputs[id] || '').trim();
    if (!answer) return alert('Please type a reply.');
    try {
      await axios.put(`http://localhost:5000/api/message/reply/${id}`, {
        answer,
        role: 'admin'
      });
      setReplyInputs((prev) => ({ ...prev, [id]: '' }));
      fetchAll();
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  const editReply = async (id, currentReply) => {
    const newReply = prompt('Edit reply:', currentReply || '');
    if (newReply === null) return;
    try {
      await axios.put(`http://localhost:5000/api/message/reply/${id}`, {
        answer: newReply,
        role: 'admin'
      });
      fetchAll();
    } catch (err) {
      console.error('Error editing reply:', err);
    }
  };

  const deleteByAdmin = async (id) => {
    if (!window.confirm('Delete this reply?')) return;
    try {
      await axios.put(`http://localhost:5000/api/message/delete/${id}`, {
        role: 'admin'
      });
      fetchAll();
    } catch (err) {
      console.error('Error deleting reply:', err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif",background:"linear-gradient(180deg, #4a738aff, #898d8eff)" }}>
      <h2 style={{ color: "#f3f1f7ff", fontWeight: "bold", marginBottom: "20px" }}>
        Admin - User Messages
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "#bdd0d3ff" }}>
            <th style={{ border: "1px solid #171220ff", padding: "8px" }}>S.No.</th>
            <th style={{ border: "1px solid #0e0e0fff", padding: "8px" }}>Examinee</th>
            <th style={{ border: "1px solid #121113ff", padding: "8px" }}>Feedback</th>
            <th style={{ border: "1px solid #070708ff", padding: "8px" }}>Admin Reply</th>
            <th style={{ border: "1px solid #110f15ff", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ border: "1px solid #161517ff", padding: "8px" }}>
                No messages found
              </td>
            </tr>
          ) : (
            messages.map((msg, idx) => (
              <tr key={msg._id}>
                <td style={{ border: "1px solid #6f42c1", padding: "8px" }}>{idx + 1}</td>
                <td style={{ border: "1px solid #6f42c1", padding: "8px" }}>
                  {msg.examineeId?.name || 'N/A'}
                  <div style={{ fontSize: "0.85em", color: "#555" }}>
                    {msg.examineeId?.email || ''}
                  </div>
                </td>
                <td style={{ border: "1px solid #6f42c1", padding: "8px" }}>{msg.question}</td>
                <td style={{ border: "1px solid #6f42c1", padding: "8px" }}>{msg.answer || 'No reply yet'}</td>
                <td style={{ border: "1px solid #6f42c1", padding: "8px", minWidth: "250px" }}>
                  <input
                    type="text"
                    placeholder="Type reply..."
                    value={replyInputs[msg._id] || ''}
                    onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px",
                      marginBottom: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px"
                    }}
                  />
                  <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                    <button 
                      onClick={() => sendReply(msg._id)}
                      style={{
                        padding: "5px 10px",
                        fontSize: "0.85em",
                        backgroundColor: "#335b7eff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Send Reply
                    </button>
                    <button 
                      onClick={() => editReply(msg._id, msg.answer)}
                      style={{
                        padding: "5px 10px",
                        fontSize: "0.85em",
                        backgroundColor: "#03384aff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Edit Reply
                    </button>
                    <button 
                      onClick={() => deleteByAdmin(msg._id)}
                      style={{
                        padding: "5px 10px",
                        fontSize: "0.85em",
                        backgroundColor: "#59040dff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MessageReply;
