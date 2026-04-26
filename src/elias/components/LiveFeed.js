import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const TYPE_MAP = {
  detection: { cls: 'tl-detection', dot: '#4F6EF7', label: 'DETECTION' },
  activity: { cls: 'tl-activity', dot: '#22C55E', label: 'ACTIVITY' },
  alert: { cls: 'tl-alert', dot: '#F59E0B', label: 'ALERT' },
  block: { cls: 'tl-block', dot: '#EF4444', label: 'BLOCK' },
  info: { cls: 'tl-info', dot: '#8B5CF6', label: 'INFO' },
};

const seedEvents = [
  ['detection', '12:08:56', 'Talent acquisition metrics details', 'Q2 Talent Review · 1240 applications tracked'],
  ['activity', '12:09:11', 'Identify the screening passed', '420 candidates passed screening stage'],
  ['alert', '12:09:21', 'Finding the details', 'Low offer acceptance rate detected: 65%'],
  ['detection', '12:07:34', 'Headcount sync complete', '2,481 employees · +79 vs last quarter'],
  ['activity', '12:06:18', 'Task reminder triggered', '7 tasks due today · 3 high priority'],
  ['info', '12:05:44', 'Meeting invite received', 'Q2 Talent Review · Today 10:00 AM'],
  ['detection', '12:04:30', 'Attrition alert flagged', 'Sales dept at 5.2% · above threshold'],
  ['activity', '12:03:12', 'Hiring funnel updated', '34 new hires confirmed this quarter'],
  ['info', '12:01:55', 'Presentation shared', 'Q2 HR Strategy Review.pptx shared by James O.'],
  ['alert', '12:00:40', 'Open roles increased', '+6 positions added since last month'],
];

const autoEvents = [
  ['detection', 'Dashboard view loaded', 'Employee HR view initialized'],
  ['activity', 'Headcount refreshed', 'Real-time sync: 2,481 active employees'],
  ['info', 'Meeting reminder', 'Exec HR Strategy Sync in 2 hrs'],
  ['alert', 'Task deadline approaching', 'Review 8 offer letters · due today'],
  ['detection', 'Hiring funnel updated', '3 new applications in last hour'],
  ['activity', 'KPI metrics refreshed', 'All 4 KPIs updated live'],
  ['info', 'Document accessed', 'Performance Review Template.pptx opened'],
  ['detection', 'Attrition data synced', 'Q2 rate: 4.1% · improving trend'],
  ['activity', 'Task completed', 'Offer letter batch review done'],
  ['alert', 'Pending meeting response', 'Performance Calibration · awaiting RSVP'],
];

function getNow() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function LiveFeed({ externalEvents }) {
  const [events, setEvents] = useState([]);
  const [autoIdx, setAutoIdx] = useState(0);

  // Fetch initial events
  useEffect(() => {
    fetch(`${API_BASE}/events`)
      .then(res => res.json())
      .then(data => {
        const rows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        if (rows.length > 0) setEvents(rows);
      })
      .catch(err => console.error(err));
  }, []);

  // Update events when external event comes in
  useEffect(() => {
    if (externalEvents && externalEvents.length > 0) {
      const latest = externalEvents[0];
      if (latest) {
        setEvents(prev => {
          // ensure we don't duplicate
          if (!prev.find(e => e.id === latest.id)) {
            return [latest, ...prev].slice(0, 80);
          }
          return prev;
        });
      }
    }
  }, [externalEvents]);

  // Auto events every 8 seconds to prevent spam
  useEffect(() => {
    const interval = setInterval(() => {
      const ev = autoEvents[autoIdx % autoEvents.length];
      fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: ev[0], title: ev[1], detail: ev[2] })
      })
      .then(res => res.json())
      .then((newEvent) => {
        const payload = newEvent?.data || newEvent;
        setEvents(prev => [payload, ...prev].slice(0, 80));
      })
      .catch(console.error);
      setAutoIdx(prev => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoIdx]);

  const totalCount = events.length;

  return (
    <div className="right">
      <div className="live-panel-head">
        <div className="live-panel-title">
          <span style={{ fontSize: '14px' }}>📡</span>
          Live Commentary
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="live-dot-r" style={{ width: '6px', height: '6px' }}></div>
          <span className="event-count">{totalCount} events</span>
          <div style={{
            background: 'var(--blue)', color: '#fff', borderRadius: '20px',
            padding: '2px 9px', fontSize: '10px', fontWeight: 700,
          }}>LIVE</div>
        </div>
      </div>

      <div style={{
        padding: '8px 14px 4px', fontSize: '10.5px', fontWeight: 700,
        color: 'var(--muted)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexShrink: 0,
      }}>
        <span>▾ Activity1</span>
        <span style={{ fontSize: '9.5px', color: 'var(--subtle)' }}>{totalCount} events</span>
      </div>

      <div className="live-feed-body">
        <div className="timeline-wrap">
          {events.map((ev) => {
            const t = TYPE_MAP[ev.type] || TYPE_MAP.info;
            return (
              <div className="tl-item" key={ev.id} style={{ animation: 'slideIn .3s ease both' }}>
                <div className="tl-dot" style={{ background: t.dot }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  <span className={`tl-type ${t.cls}`}>{t.label}</span>
                  <span className="tl-time">{ev.time}</span>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text)', marginBottom: '1px' }}>
                  {ev.title}
                </div>
                <div className="tl-text">{ev.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { getNow };
export default LiveFeed;
