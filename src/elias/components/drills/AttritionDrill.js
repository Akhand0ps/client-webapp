import React from 'react';

function AttritionDrill({ onBack }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="top-row" style={{ marginBottom: '16px' }}>
        <div className="page-title"><span className="ico">📉</span>
          <div>
            <h1>Attrition Analysis</h1><span className="crumb">/ Q2 2026</span>
          </div>
        </div>
        <div className="live-pill">
          <div className="live-dot-r"></div>Live
        </div>
      </div>
      <div className="report-grid">
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--red)' }}>4.1%</div>
          <div className="rs-label">Overall Rate</div>
        </div>
        <div className="report-stat">
          <div className="rs-val">102</div>
          <div className="rs-label">Exits this Quarter</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--green)' }}>▼ 0.8%</div>
          <div className="rs-label">Improvement vs Q1</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: '14px' }}>
        <div className="card-head">
          <div className="card-title">Attrition by Department</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Exits</th>
              <th>Rate</th>
              <th>Primary Reason</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sales</td>
              <td>18</td>
              <td style={{ color: 'var(--red)' }}><strong>5.2%</strong></td>
              <td>Market opportunity</td>
              <td><span className="chip" style={{ background: 'var(--red-l)', color: 'var(--red)' }}>High</span></td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>7</td>
              <td style={{ color: 'var(--orange)' }}>4.5%</td>
              <td>Career growth</td>
              <td><span className="chip" style={{ background: 'var(--orange-l)', color: 'var(--orange)' }}>Medium</span></td>
            </tr>
            <tr>
              <td>Engineering</td>
              <td>18</td>
              <td>3.1%</td>
              <td>Compensation</td>
              <td><span className="chip" style={{ background: 'var(--orange-l)', color: 'var(--orange)' }}>Medium</span></td>
            </tr>
            <tr>
              <td>HR &amp; Ops</td>
              <td>6</td>
              <td style={{ color: 'var(--green)' }}>2.4%</td>
              <td>Relocation</td>
              <td><span className="chip" style={{ background: 'var(--green-l)', color: 'var(--green)' }}>Low</span></td>
            </tr>
            <tr>
              <td>Finance</td>
              <td>3</td>
              <td style={{ color: 'var(--green)' }}>1.8%</td>
              <td>Personal</td>
              <td><span className="chip" style={{ background: 'var(--green-l)', color: 'var(--green)' }}>Low</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttritionDrill;
