import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const GetExam = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const email = localStorage.getItem('userEmail');

  // Fetch exam
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/exam/${examId}`);
        const { exam: examData, questions: questionData } = res.data;
        setExam(examData);
        setQuestions(questionData);
        setTimeLeft(parseInt(examData.duration) * 60);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };
    fetchExam();
  }, [examId]);

  // Auto submit if not started
  useEffect(() => {
    if (!exam || testStarted) return;
    const startTimeout = setTimeout(() => {
      if (!testStarted) {
        setError('Test expired: You did not start the test in time.');
        setSubmitted(true);
        navigate('/userdash/profile');
      }
    }, 30000); // 30 sec to start
    return () => clearTimeout(startTimeout);
  }, [exam, testStarted, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted || !testStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  // Security tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && testStarted && !submitted) {
        setError('Violation: Tab switching detected. Exam auto-submitted.');
        handleSubmit();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted, submitted]);

  // Disable copy/paste
  useEffect(() => {
    const preventCopyPaste = (e) => {
      if (testStarted && !submitted) {
        e.preventDefault();
        setError('Violation: Copy/Paste detected. Exam auto-submitted.');
        handleSubmit();
      }
    };
    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);
    return () => {
      document.removeEventListener('cut', preventCopyPaste);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!testStarted) setTestStarted(true);
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    try {
      const res = await axios.post('http://localhost:5000/api/exams/submit-exam', {
        examId,
        answers,
        email,
      });
      setResult(res.data);
      setSubmitted(true);
      alert('Exam submitted successfully!');
      window.location.href = '/userDashboard';
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.response?.data?.error || 'Failed to submit exam');
    }
  };

  if (error) {
    return <div style={{ margin: "20px", padding: "15px", background: "#f8d7da", color: "#721c24", borderRadius: "8px" }}>{error}</div>;
  }

  if (!exam || !questions.length) {
    return <div style={{ textAlign: "center", margin: "20px", fontSize: "18px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "auto", marginTop: "20px", padding: "20px", background:"linear-gradient(180deg, #2c3e50, #4ca1af)", borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#f6f1f1ff", marginBottom: "15px" }}>{exam.title}</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", padding: "10px", background: "#eef2f7", borderRadius: "8px" }}>
        <p><strong>Duration:</strong> {exam.duration} mins</p>
        <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
        <p><strong>Passing Marks:</strong> {exam.passingMarks}</p>
        <p style={{ color: timeLeft < 60 ? "red" : "green", fontWeight: "bold" }}><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
      </div>

      {submitted && result ? (
        <div style={{ background: "#e9f7ef", padding: "15px", borderRadius: "8px", border: "1px solid #c3e6cb" }}>
          <h4>Exam Results</h4>
          <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
          <p><strong>Status:</strong> {result.passed ? '✅ Passed' : '❌ Failed'}</p>
          <h5>Answer Details:</h5>
          <ul>
            {result.results.map((res, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Q{index + 1}:</strong> {res.question}<br />
                <span style={{ color: "blue" }}><strong>Your Answer:</strong> {res.selectedAnswer || 'Not answered'}</span><br />
                <span style={{ color: "green" }}><strong>Correct Answer:</strong> {res.correctAnswer}</span><br />
                <span style={{ color: res.isCorrect ? "green" : "red" }}><strong>Result:</strong> {res.isCorrect ? 'Correct ✅' : 'Incorrect ❌'}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {!testStarted && (
            <div style={{ background: "#fff3cd", padding: "10px", borderRadius: "8px", marginBottom: "15px" }}>
              Please start the test by selecting an answer. <strong>Exam will expire in 30 sec if not started.</strong>
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {questions.map((q, index) => (
              <div key={q._id} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "10px", padding: "15px", marginBottom: "15px", boxShadow: "0px 2px 6px rgba(0,0,0,0.05)" }}>
                <h5 style={{ marginBottom: "10px", color: "#333" }}>Q{index + 1}: {q.question}</h5>
                {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={opt}
                      checked={answers[q._id] === opt}
                      onChange={() => handleAnswerChange(q._id, opt)}
                      disabled={submitted}
                      style={{ marginRight: "8px" }}
                    />
                    <label>{opt}</label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" disabled={submitted} style={{ background: "#04455bff", color: "white", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
              Submit Exam
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default GetExam;
