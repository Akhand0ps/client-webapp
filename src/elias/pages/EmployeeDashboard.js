import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import AnswerBox from '../components/AnswerBox';
import FeedbackButtons from '../components/FeedbackButtons';
import LiveFeed, { getNow } from '../components/LiveFeed';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EmployeeDashboard = () => {
  const [answer, setAnswer] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [savedQueryId, setSavedQueryId] = useState(null);

  const addEvent = (type, title, detail) => {
    setEvents(prev => [
      { type, title, detail, time: getNow() },
      ...prev
    ]);
  };

  const handleSearch = async (q) => {
    setQuery(q);
    setLoading(true);

    const res = await fetch(`${API_BASE}/queries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        department: "IT",
        user_query: q,
        answer: "Processing...",
        answer_key: "default"
      })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.data?.id) {
      setSavedQueryId(data.data.id);
    }

    const generatedAnswer = "Answer for: " + q;
    setAnswer(generatedAnswer);

    addEvent("query", "User asked", q);
    setLoading(false);
  };

  const handleFeedback = async (val) => {
    if (!savedQueryId) return;
    await fetch(`${API_BASE}/queries/${savedQueryId}/feedback`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        feedback: val ? 1 : -1
      })
    });

    addEvent("feedback", "Feedback", val ? "👍" : "👎");
  };

  return (
    <div className="app">
      <div className="left">
        <SearchBar onSearch={handleSearch} />
        <AnswerBox answer={answer} loading={loading} />
        {answer && <FeedbackButtons onFeedback={handleFeedback} />}
      </div>

      <LiveFeed externalEvents={events} />
    </div>
  );
};

export default EmployeeDashboard;