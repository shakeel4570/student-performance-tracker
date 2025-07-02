import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', message: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      setStatus('Please fill all fields');
      return;
    }
    try {
      await axios.post('http://localhost:5000/feedback', form);
      setStatus('✅ Feedback submitted');
      setForm({ name: '', message: '' });
      fetchFeedbacks();
    } catch (err) {
      setStatus('❌ Submission failed');
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(res.data);
    } catch {
      setStatus('❌ Error loading feedbacks');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="container">
      <h2>Student Feedback Form</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Enter your message"
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
      <p>{status}</p>

      <h3>All Feedbacks</h3>
      <ul>
        {feedbacks.map((fb, i) => (
          <li key={i}><strong>{fb.name}</strong>: {fb.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
