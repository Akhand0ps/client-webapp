import React from 'react';

function HiringDrill({ onBack }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="top-row" style={{ marginBottom: '16px' }}>
        <div className="page-title"><span className="ico">🎯</span>
          <div>
            <h1>Hiring Funnel</h1><span className="crumb">/ Q2 2026 Detailed View</span>
          </div>
        </div>
        <div className="date-chip">Conversion: 2.7%</div>
      </div>
      <div className="report-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="report-stat">
          <div className="rs-val">1240</div>
          <div className="rs-label">Applications</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--teal)' }}>420</div>
          <div className="rs-label">Screened</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--purple)' }}>180</div>
          <div className="rs-label">Interviews</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--orange)' }}>52</div>
          <div className="rs-label">Offers</div>
        </div>
        <div className="report-stat">
          <div className="rs-val" style={{ color: 'var(--green)' }}>34</div>
          <div className="rs-label">Hired</div>
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Funnel by Department</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Applications</th>
              <th>Screened</th>
              <th>Interviewed</th>
              <th>Offered</th>
              <th>Hired</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Engineering</td>
              <td>480</td>
              <td>160</td>
              <td>72</td>
              <td>22</td>
              <td>14</td>
            </tr>
            <tr>
              <td>Sales</td>
              <td>310</td>
              <td>110</td>
              <td>42</td>
              <td>14</td>
              <td>8</td>
            </tr>
            <tr>
              <td>Product</td>
              <td>190</td>
              <td>72</td>
              <td>28</td>
              <td>8</td>
              <td>5</td>
            </tr>
            <tr>
              <td>HR &amp; Ops</td>
              <td>140</td>
              <td>50</td>
              <td>24</td>
              <td>6</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Design</td>
              <td>120</td>
              <td>28</td>
              <td>14</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HiringDrill;
