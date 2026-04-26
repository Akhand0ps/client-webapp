import React from 'react';

function MeetingDrill({ title, onBack, onToast }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="meet-detail-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Today · 10:00 AM – 11:00 AM · Conference Room A</div>
          </div>
          <button className="join-btn" style={{ padding: '8px 20px', fontSize: '12.5px' }} onClick={() => onToast('🚀 Joining meeting…')}>▷ Join Now</button>
        </div>
        <div className="row2" style={{ gap: '12px', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '10.5px', color: 'var(--muted)', fontWeight: 600, marginBottom: '5px' }}>ORGANIZER</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>James O.</div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', color: 'var(--muted)', fontWeight: 600, marginBottom: '5px' }}>ATTENDEES</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Priya N., Rais A., +4 more</div>
          </div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.6 }}>
          📋 <strong style={{ color: 'var(--text)' }}>Agenda:</strong> Review Q2 talent acquisition metrics, discuss screening pass rates, align on offer strategy for Engineering and Sales, approve headcount additions.
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">📎 Meeting Documents</div>
        </div>
        <div className="card-body">
          <div className="pres-item" onClick={() => onToast('📄 Opening document…')}>
            <div className="pres-icon" style={{ background: 'var(--blue-l)', color: 'var(--blue)' }}>P</div>
            <div className="pres-info">
              <div className="pres-name">Q2 HR Strategy Review.pptx</div>
              <div className="pres-meta">24 slides · Shared by James O.</div>
            </div>
            <span className="pres-tag tag-shared">Shared</span>
          </div>
          <div className="pres-item" onClick={() => onToast('📄 Opening document…')}>
            <div className="pres-icon" style={{ background: 'var(--teal-l)', color: 'var(--teal)' }}>P</div>
            <div className="pres-info">
              <div className="pres-name">Talent Acquisition Overview.pptx</div>
              <div className="pres-meta">18 slides · Shared by Priya N.</div>
            </div>
            <span className="pres-tag tag-draft">Draft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingDrill;
