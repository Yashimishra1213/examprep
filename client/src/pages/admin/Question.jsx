import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Question = () => {
  const [formData, setFormdata] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject:"",
  });

  const[questions, setQuestions]=useState([]);
  const[subjects, setSubjects]=useState([]);
  const [id, setId] = useState({ id: '' });
  const [editform, setEditForm] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editform) {
        const res = await axios.put(`http://localhost:5000/api/question/${id.id}`, formData);
        if (res) {
          alert('Question updated successfully');
        }
      } else {
        const res = await axios.post('http://localhost:5000/api/question', formData);
        if (res) {
          alert('Question added successfully');
        }
      }

      setFormdata({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        subject:"",
      });
      setEditForm(false);
      setId({ id: '' });
      handlefetch();
    } catch (err) {
      console.log(err);
      alert("Sorry, try again later");
    }
  };

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/question');
    setData(res.data.data);

    const res1 = await axios.get('http://localhost:5000/api/subject');
    setSubjects(res1.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/question/${id}`);
      if (res) {
        alert("Deleted Successfully");
        handlefetch();
      }
    } catch (err) {
      alert("Try Again Later");
    }
  };

  const handleEdit = (q) => {
    setFormdata({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer
    });
    setId({ id: q._id });
    setEditForm(true);
  };

  return (
    <div className="container-fluid p-3" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row">
        <div className="col-sm-12">
          <div
              className="card shadow-sm"
              style={{
                border: "1px solid #0b0b0bff",
                borderRadius: "12px",
                minHeight: "220px",
                width: "100%",
              }}
            >
            <form onSubmit={handleSubmit} className="border-0 p-3 rounded" style={{background:"linear-gradient(180deg, #2c3e50, #4ca1af)"}}>
              <div className="row">
                <div className="col-sm-12 ">
                  <h5 className="fw-bold" style={{ color: "#e7e5ecff" }}>
                    <i className="fa-solid fa-plus"  style={{ marginRight: "8px" }}></i> 
                    {editform ? 'Edit Question' : 'Add Question'}
                  </h5>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-12">
                  <label className="fw-semibold mb-1" style={{color:"white"}}>Question</label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter Question Here"
                    style={{ borderRadius: "8px"}}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionA"
                    placeholder="a.) Option 1"
                    className="form-control"
                    value={formData.optionA}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionB"
                    placeholder="b.) Option 2"
                    className="form-control"
                    value={formData.optionB}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionC"
                    placeholder="c.) Option 3"
                    className="form-control"
                    value={formData.optionC}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionD"
                    placeholder="d.) Option 4"
                    className="form-control"
                    value={formData.optionD}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <input
                    name="correctAnswer"
                    className="form-control"
                    placeholder="Correct Option"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className='col-sm-6'>
                   <select 
                     name='subject' 
                     value={formData.subject}
                     onChange={handleChange} 
                     className='form-select'
                     required
                     style={{ borderRadius: "8px" }}
                   >
                    <option value=""> Select Subject</option>
                   {subjects.map((sub)=>(
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                   ))}
                   </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="btn mt-3 text-white fw-semibold"
                style={{ 
                  background: " #54727eff", 
                  borderRadius: "8px", 
                  padding: "8px 20px" 
                }}
              >
                {editform ? "Update Question" : "Add Question"}
              </button>
            </form>
          </div>
        </div>
      </div>

       <div 
         className="card mx-auto mt-3 shadow-sm"
         style={{
           border: "1px solid #6f42c1",
           borderRadius: "12px",
           width: "100%",
           background:"linear-gradient(180deg, #2c3e50, #4ca1af)"
         }}
       >
        <div className="card-body">
          <h3 className="fw-bold mb-3" style={{ color: "#e0dde7ff" }}>Question List</h3>
          <table className="table table-bordered text-center align-middle"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <thead style={{ background: "#1d85b2ff", color: "white" }}>
              <tr>
                <th>S.No.</th>
                <th>Question</th>
                <th>Subject</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Correct Option</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((q, index) => (
                <tr key={q._id}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "left", maxWidth: "250px" }}>{q.question}</td>
                  <td>{q.subject?.name}</td>
                  <td>{q.optionA}</td>
                  <td>{q.optionB}</td>
                  <td>{q.optionC}</td>
                  <td>{q.optionD}</td>
                  <td>{q.correctAnswer}</td>
                  <td>
                    <button 
                      className="me-2"
                      style={{
                        background: "#51638dff",
                        color: "#f1efefff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        fontWeight: "500",
                      }}
                      onClick={() => handleEdit(q)}
                    >
                      Edit
                    </button>
                    <button 
                      style={{
                        background: "#67050eff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        fontWeight: "500",
                      }}
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="9">No questions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Question;
