import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function MeetingList({ onDrillMeeting }) {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/hr/meetings`)
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card fu fu4" style={{ marginBottom: '14px' }}>
      <div className="card-head">
        <div className="card-title">
          📅 Meeting Invitations <span className="section-tag">Today &amp; This Week</span>
        </div>
      </div>
      <div className="card-body" style={{ padding: '8px 16px' }}>
        {meetings.map((m) => (
          <div className="meeting-item" key={m.id}>
            <div className="meet-time-col">
              <div className="meet-date-tag" style={{ background: m.date_color, color: m.date_text_color }}>
                {m.date_tag}
              </div>
              <div className="meet-time-tag">{m.time}</div>
            </div>
            <div className="meet-body">
              <div className="meet-title">{m.title}</div>
              <div className="meet-members">{m.members}</div>
            </div>
            <div className="meet-actions">
              {m.has_join && (
                <button className="join-btn" onClick={() => onDrillMeeting(m.title)}>▷ Join</button>
              )}
              <span className={`meet-status ${m.status === 'Accepted' ? 'st-accepted' : 'st-pending'}`}>
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingList;
