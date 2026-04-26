import React from 'react';
import BarChart from '../BarChart';

function HeadcountDrill({ onBack }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="top-row" style={{ marginBottom: '16px' }}>
        <div className="page-title"><span className="ico">👥</span>
          <div>
            <h1>Headcount Report</h1><span className="crumb">/ Full Department Breakdown</span>
          </div>
        </div>
        <div className="date-chip">Apr 2026 · 2,481 total</div>
      </div>
      <div className="report-grid">
        <div className="report-stat">
          <div className="rs-val">2,481</div>
          <div className="rs-label">Total Headcount</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--green)' }}>+3.2%</div>
          <div className="rs-label">vs Last Month</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--orange)' }}>34</div>
          <div className="rs-label">Open Roles</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: '14px' }}>
        <div className="card-head">
          <div className="card-title">Department Breakdown</div><span className="section-tag">Live</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Headcount</th>
              <th>vs Last Month</th>
              <th>Attrition Rate</th>
              <th>Open Roles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Engineering</td>
              <td><strong>580</strong></td>
              <td style={{ color: 'var(--green)' }}>▲ +12</td>
              <td>3.1%</td>
              <td>14</td>
            </tr>
            <tr>
              <td>Sales</td>
              <td><strong>340</strong></td>
              <td style={{ color: 'var(--green)' }}>▲ +8</td>
              <td>5.2%</td>
              <td>8</td>
            </tr>
            <tr>
              <td>HR &amp; Ops</td>
              <td><strong>248</strong></td>
              <td style={{ color: 'var(--red)' }}>▼ −2</td>
              <td>2.4%</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Finance</td>
              <td><strong>180</strong></td>
              <td style={{ color: 'var(--green)' }}>▲ +4</td>
              <td>1.8%</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td><strong>155</strong></td>
              <td style={{ color: 'var(--green)' }}>▲ +2</td>
              <td>4.5%</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Legal</td>
              <td><strong>98</strong></td>
              <td>—</td>
              <td>1.0%</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Product</td>
              <td><strong>212</strong></td>
              <td style={{ color: 'var(--green)' }}>▲ +5</td>
              <td>2.9%</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Design</td>
              <td><strong>88</strong></td>
              <td style={{ color: 'var(--red)' }}>▼ −1</td>
              <td>3.4%</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row2">
        <div className="card">
          <div className="card-head">
            <div className="card-title">📊 Growth Trend (6 months)</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1, width: '100%', background: 'var(--blue-m)', borderRadius: '4px 4px 0 0', minHeight: '30px' }}></div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>Nov</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1.1, width: '100%', background: 'var(--blue-m)', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>Dec</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1.2, width: '100%', background: 'var(--blue-m)', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>Jan</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1.3, width: '100%', background: 'var(--blue-m)', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>Feb</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1.45, width: '100%', background: 'var(--blue-m)', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>Mar</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1.6, width: '100%', background: 'var(--blue)', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>Apr</div>
              </div>
            </div>
          </div>
        </div>
        <BarChart 
          title="🔢 By Employment Type" 
          data={[
            { label: 'Full-Time', width: '82%', color: 'var(--blue)', value: '2035' },
            { label: 'Contract', width: '13%', color: 'var(--teal)', value: '320' },
            { label: 'Part-Time', width: '5%', color: 'var(--orange)', value: '126' },
          ]}
        />
      </div>
    </div>
  );
}

export default HeadcountDrill;
