import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function FunnelChart({ onDetails }) {
  const [funnelData, setFunnelData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/hr/charts?type=funnel`)
      .then(res => res.json())
      .then(data => setFunnelData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">
          🎯 Hiring Funnel <span className="section-tag">This Quarter</span>
        </div>
        {onDetails && <button className="view-btn" onClick={onDetails}>Details →</button>}
      </div>
      <div className="card-body">
        {funnelData.map((item, i) => (
          <div className="funnel-row" key={i}>
            <div className="funnel-label">{item.label}</div>
            <div className="funnel-track">
              <div className="funnel-fill" style={{ width: item.width, background: item.color }}></div>
            </div>
            <div className="funnel-num">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FunnelChart;
