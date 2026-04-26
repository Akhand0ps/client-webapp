import React from 'react';

function PositionsDrill({ onBack, onToast }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="top-row" style={{ marginBottom: '16px' }}>
        <div className="page-title"><span className="ico">💼</span>
          <div>
            <h1>Open Positions</h1><span className="crumb">/ 34 Active Roles</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => onToast('📤 Job posting form opened')}>+ Post New Role</button>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Active Job Openings</div><span className="section-tag">34 open</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Department</th>
              <th>Level</th>
              <th>Posted</th>
              <th>Applications</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Senior Software Engineer</strong></td>
              <td>Engineering</td>
              <td>L5</td>
              <td>Apr 10</td>
              <td>84</td>
              <td><span className="chip" style={{ background: 'var(--green-l)', color: 'var(--green)' }}>Active</span></td>
            </tr>
            <tr>
              <td><strong>Product Manager</strong></td>
              <td>Product</td>
              <td>L4</td>
              <td>Apr 14</td>
              <td>62</td>
              <td><span className="chip" style={{ background: 'var(--green-l)', color: 'var(--green)' }}>Active</span></td>
            </tr>
            <tr>
              <td><strong>Sales Lead (APAC)</strong></td>
              <td>Sales</td>
              <td>L4</td>
              <td>Apr 8</td>
              <td>45</td>
              <td><span className="chip" style={{ background: 'var(--orange-l)', color: 'var(--orange)' }}>Interview</span></td>
            </tr>
            <tr>
              <td><strong>HR Business Partner</strong></td>
              <td>HR &amp; Ops</td>
              <td>L3</td>
              <td>Apr 16</td>
              <td>31</td>
              <td><span className="chip" style={{ background: 'var(--green-l)', color: 'var(--green)' }}>Active</span></td>
            </tr>
            <tr>
              <td><strong>Data Analyst</strong></td>
              <td>Finance</td>
              <td>L3</td>
              <td>Apr 18</td>
              <td>27</td>
              <td><span className="chip" style={{ background: 'var(--green-l)', color: 'var(--green)' }}>Active</span></td>
            </tr>
            <tr>
              <td><strong>UX Designer</strong></td>
              <td>Design</td>
              <td>L3</td>
              <td>Apr 20</td>
              <td>19</td>
              <td><span className="chip" style={{ background: 'var(--blue-l)', color: 'var(--blue)' }}>Screening</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PositionsDrill;
