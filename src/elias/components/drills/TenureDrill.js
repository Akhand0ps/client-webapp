import React from 'react';

function TenureDrill({ onBack }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="top-row" style={{ marginBottom: '16px' }}>
        <div className="page-title"><span className="ico">⏱</span>
          <div>
            <h1>Tenure Analysis</h1><span className="crumb">/ Workforce Experience</span>
          </div>
        </div>
        <div className="date-chip">Avg: 3.4 years</div>
      </div>
      <div className="report-grid">
        <div className="report-stat">
          <div className="rs-val">3.4 yr</div>
          <div className="rs-label">Average Tenure</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--green)' }}>6.2 yr</div>
          <div className="rs-label">Highest (Legal)</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--orange)' }}>1.8 yr</div>
          <div className="rs-label">Lowest (Sales)</div>
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Tenure Distribution</div>
        </div>
        <div className="card-body">
          <div className="bar-row">
            <div className="bar-label">&lt; 1 year</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '22%', background: 'var(--red)' }}></div>
            </div>
            <div className="bar-val">546</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">1–3 years</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '41%', background: 'var(--orange)' }}></div>
            </div>
            <div className="bar-val">1017</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">3–5 years</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '24%', background: 'var(--blue)' }}></div>
            </div>
            <div className="bar-val">595</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">5–10 years</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '10%', background: 'var(--green)' }}></div>
            </div>
            <div className="bar-val">248</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">10+ years</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '3%', background: 'var(--purple)' }}></div>
            </div>
            <div className="bar-val">75</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenureDrill;
